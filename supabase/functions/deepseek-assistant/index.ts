// DeepSeek Assistant edge function
// Actions: generate_draft | rewrite | improve_headline | generate_lead | seo | suggest_category | suggest_tags | quality_check | custom

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface ReqBody {
  action: string;
  topic?: string;
  title?: string;
  content?: string;
  lead?: string;
  prompt?: string;
  article_id?: string;
  city_id?: string;
}

const SYSTEM_BY_ACTION: Record<string, string> = {
  generate_draft: "Ты — профессиональный российский журналист новостного портала. Пиши краткие, нейтральные, информативные новости на русском языке. Структура: заголовок, лид (1-2 предложения), текст (3-5 абзацев). Без воды.",
  rewrite: "Ты — редактор. Перепиши текст: улучши стиль, сохрани факты, убери воду, сохрани длину примерно такой же. Отвечай только переписанным текстом.",
  improve_headline: "Ты — редактор заголовков. Сделай заголовок цепляющим, точным, до 90 символов, без кликбейта. Верни ТОЛЬКО заголовок, без кавычек и пояснений.",
  generate_lead: "Сгенерируй лид (вступление) к новости — 1-2 предложения, до 200 символов. Верни только лид.",
  seo: "Сгенерируй SEO-заголовок (до 60 символов) и SEO-описание (до 160 символов) для статьи. Ответ строго в формате JSON: {\"seo_title\":\"...\",\"seo_description\":\"...\"}.",
  suggest_category: "Определи наиболее подходящую категорию для новости из списка: Новости, Город, Происшествия, Бизнес, Спорт, Культура, Политика, Общество. Верни только название одной категории.",
  suggest_tags: "Предложи 5-8 тегов для статьи через запятую на русском языке. Только теги, без пояснений.",
  quality_check: "Проверь текст на ошибки, фактические неточности, повторы. Верни короткий список замечаний, по пунктам.",
  custom: "Ты — AI-ассистент редакции новостного портала Тюмень.инфо. Отвечай по-русски, кратко и по делу.",
};

const buildUserMessage = (b: ReqBody): string => {
  switch (b.action) {
    case "generate_draft": return `Тема: ${b.topic ?? b.prompt ?? ""}`;
    case "rewrite": return `Перепиши:\n\n${b.content ?? ""}`;
    case "improve_headline": return `Текущий заголовок: ${b.title ?? ""}\n\nТекст: ${b.content ?? b.lead ?? ""}`;
    case "generate_lead": return `Заголовок: ${b.title ?? ""}\n\nТекст: ${b.content ?? ""}`;
    case "seo": return `Заголовок: ${b.title ?? ""}\nЛид: ${b.lead ?? ""}\nТекст: ${(b.content ?? "").slice(0, 2000)}`;
    case "suggest_category": return `${b.title ?? ""}\n\n${b.lead ?? ""}\n\n${(b.content ?? "").slice(0, 1000)}`;
    case "suggest_tags": return `${b.title ?? ""}\n\n${(b.content ?? "").slice(0, 1500)}`;
    case "quality_check": return `${b.title ?? ""}\n\n${b.content ?? ""}`;
    default: return b.prompt ?? "";
  }
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const apiKey = Deno.env.get("DEEPSEEK_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "DEEPSEEK_API_KEY не настроен. Добавьте секрет в проект." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verify user
    const authHeader = req.headers.get("Authorization");
    const supaUrl = Deno.env.get("SUPABASE_URL")!;
    const supaAnon = Deno.env.get("SUPABASE_PUBLISHABLE_KEY") ?? Deno.env.get("SUPABASE_ANON_KEY")!;
    const supaService = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const client = createClient(supaUrl, supaAnon, {
      global: { headers: { Authorization: authHeader ?? "" } },
    });
    const { data: userData } = await client.auth.getUser();
    if (!userData?.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body: ReqBody = await req.json();
    const system = SYSTEM_BY_ACTION[body.action] ?? SYSTEM_BY_ACTION.custom;
    const userMsg = buildUserMessage(body);

    const dsResp = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: system },
          { role: "user", content: userMsg },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    const adminClient = createClient(supaUrl, supaService);

    if (!dsResp.ok) {
      const errText = await dsResp.text();
      await adminClient.from("ai_runs").insert({
        provider: "deepseek", model: "deepseek-chat",
        user_id: userData.user.id, city_id: body.city_id ?? null, article_id: body.article_id ?? null,
        action: body.action, prompt: userMsg, status: "error", error: `${dsResp.status}: ${errText.slice(0, 500)}`,
      });
      return new Response(
        JSON.stringify({ error: `DeepSeek API: ${dsResp.status}`, details: errText }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const dsJson = await dsResp.json();
    const result: string = dsJson.choices?.[0]?.message?.content ?? "";

    await adminClient.from("ai_runs").insert({
      provider: "deepseek", model: "deepseek-chat",
      user_id: userData.user.id, city_id: body.city_id ?? null, article_id: body.article_id ?? null,
      action: body.action, prompt: userMsg, result, status: "success",
    });

    return new Response(JSON.stringify({ result, action: body.action }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
