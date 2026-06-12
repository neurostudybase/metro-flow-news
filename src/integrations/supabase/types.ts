export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      ad_campaigns: {
        Row: {
          advertiser_name: string
          city_id: string | null
          clicks: number
          created_at: string
          end_at: string | null
          id: string
          image_url: string | null
          impressions: number
          link_url: string | null
          slot_id: string | null
          start_at: string | null
          status: Database["public"]["Enums"]["campaign_status"]
          updated_at: string
        }
        Insert: {
          advertiser_name: string
          city_id?: string | null
          clicks?: number
          created_at?: string
          end_at?: string | null
          id?: string
          image_url?: string | null
          impressions?: number
          link_url?: string | null
          slot_id?: string | null
          start_at?: string | null
          status?: Database["public"]["Enums"]["campaign_status"]
          updated_at?: string
        }
        Update: {
          advertiser_name?: string
          city_id?: string | null
          clicks?: number
          created_at?: string
          end_at?: string | null
          id?: string
          image_url?: string | null
          impressions?: number
          link_url?: string | null
          slot_id?: string | null
          start_at?: string | null
          status?: Database["public"]["Enums"]["campaign_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ad_campaigns_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ad_campaigns_slot_id_fkey"
            columns: ["slot_id"]
            isOneToOne: false
            referencedRelation: "ad_slots"
            referencedColumns: ["id"]
          },
        ]
      }
      ad_slots: {
        Row: {
          city_id: string | null
          created_at: string
          id: string
          name: string
          placement_key: string
          status: string
        }
        Insert: {
          city_id?: string | null
          created_at?: string
          id?: string
          name: string
          placement_key: string
          status?: string
        }
        Update: {
          city_id?: string | null
          created_at?: string
          id?: string
          name?: string
          placement_key?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "ad_slots_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_runs: {
        Row: {
          action: string
          article_id: string | null
          city_id: string | null
          created_at: string
          error: string | null
          id: string
          model: string
          prompt: string | null
          provider: string
          result: string | null
          status: Database["public"]["Enums"]["ai_run_status"]
          user_id: string | null
        }
        Insert: {
          action: string
          article_id?: string | null
          city_id?: string | null
          created_at?: string
          error?: string | null
          id?: string
          model: string
          prompt?: string | null
          provider: string
          result?: string | null
          status?: Database["public"]["Enums"]["ai_run_status"]
          user_id?: string | null
        }
        Update: {
          action?: string
          article_id?: string | null
          city_id?: string | null
          created_at?: string
          error?: string | null
          id?: string
          model?: string
          prompt?: string | null
          provider?: string
          result?: string | null
          status?: Database["public"]["Enums"]["ai_run_status"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_runs_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_runs_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      articles: {
        Row: {
          author_name: string | null
          category_id: string | null
          city_id: string
          content: string | null
          cover_alt: string | null
          cover_image_url: string | null
          created_at: string
          created_by: string | null
          id: string
          is_breaking: boolean
          is_featured: boolean
          is_pinned: boolean
          lead: string | null
          likes_count: number
          publish_at: string | null
          published_at: string | null
          seo_description: string | null
          seo_title: string | null
          shares_count: number
          slug: string
          source_name: string | null
          source_url: string | null
          status: Database["public"]["Enums"]["article_status"]
          title: string
          updated_at: string
          updated_by: string | null
          views_count: number
        }
        Insert: {
          author_name?: string | null
          category_id?: string | null
          city_id: string
          content?: string | null
          cover_alt?: string | null
          cover_image_url?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          is_breaking?: boolean
          is_featured?: boolean
          is_pinned?: boolean
          lead?: string | null
          likes_count?: number
          publish_at?: string | null
          published_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          shares_count?: number
          slug: string
          source_name?: string | null
          source_url?: string | null
          status?: Database["public"]["Enums"]["article_status"]
          title: string
          updated_at?: string
          updated_by?: string | null
          views_count?: number
        }
        Update: {
          author_name?: string | null
          category_id?: string | null
          city_id?: string
          content?: string | null
          cover_alt?: string | null
          cover_image_url?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          is_breaking?: boolean
          is_featured?: boolean
          is_pinned?: boolean
          lead?: string | null
          likes_count?: number
          publish_at?: string | null
          published_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          shares_count?: number
          slug?: string
          source_name?: string | null
          source_url?: string | null
          status?: Database["public"]["Enums"]["article_status"]
          title?: string
          updated_at?: string
          updated_by?: string | null
          views_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "articles_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "articles_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          city_id: string | null
          created_at: string
          id: string
          name: string
          slug: string
          sort_order: number
          status: string
          type: string
        }
        Insert: {
          city_id?: string | null
          created_at?: string
          id?: string
          name: string
          slug: string
          sort_order?: number
          status?: string
          type?: string
        }
        Update: {
          city_id?: string | null
          created_at?: string
          id?: string
          name?: string
          slug?: string
          sort_order?: number
          status?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      cities: {
        Row: {
          created_at: string
          domain: string | null
          id: string
          is_default: boolean
          logo_url: string | null
          name: string
          region: string | null
          slug: string
          status: Database["public"]["Enums"]["city_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          domain?: string | null
          id?: string
          is_default?: boolean
          logo_url?: string | null
          name: string
          region?: string | null
          slug: string
          status?: Database["public"]["Enums"]["city_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          domain?: string | null
          id?: string
          is_default?: boolean
          logo_url?: string | null
          name?: string
          region?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["city_status"]
          updated_at?: string
        }
        Relationships: []
      }
      editorial_log: {
        Row: {
          action: string
          city_id: string | null
          created_at: string
          entity_id: string | null
          entity_type: string
          id: string
          meta_json: Json
          user_id: string | null
        }
        Insert: {
          action: string
          city_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type: string
          id?: string
          meta_json?: Json
          user_id?: string | null
        }
        Update: {
          action?: string
          city_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          id?: string
          meta_json?: Json
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "editorial_log_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      homepage_layouts: {
        Row: {
          city_id: string
          created_at: string
          created_by: string | null
          id: string
          layout_json: Json
          published_at: string | null
          status: Database["public"]["Enums"]["layout_status"]
          updated_at: string
          version_name: string
        }
        Insert: {
          city_id: string
          created_at?: string
          created_by?: string | null
          id?: string
          layout_json?: Json
          published_at?: string | null
          status?: Database["public"]["Enums"]["layout_status"]
          updated_at?: string
          version_name: string
        }
        Update: {
          city_id?: string
          created_at?: string
          created_by?: string | null
          id?: string
          layout_json?: Json
          published_at?: string | null
          status?: Database["public"]["Enums"]["layout_status"]
          updated_at?: string
          version_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "homepage_layouts_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      media_items: {
        Row: {
          alt: string | null
          city_id: string | null
          created_at: string
          credit: string | null
          file_name: string
          file_type: string | null
          file_url: string
          id: string
          source: string | null
          uploaded_by: string | null
        }
        Insert: {
          alt?: string | null
          city_id?: string | null
          created_at?: string
          credit?: string | null
          file_name: string
          file_type?: string | null
          file_url: string
          id?: string
          source?: string | null
          uploaded_by?: string | null
        }
        Update: {
          alt?: string | null
          city_id?: string | null
          created_at?: string
          credit?: string | null
          file_name?: string
          file_type?: string | null
          file_url?: string
          id?: string
          source?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "media_items_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          status: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          status?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          city_id: string | null
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          city_id?: string | null
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          city_id?: string | null
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_any_admin_role: { Args: { _user_id: string }; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      ai_run_status: "pending" | "success" | "error"
      app_role:
        | "super_admin"
        | "city_editor"
        | "journalist"
        | "moderator"
        | "ad_manager"
        | "seo_manager"
      article_status:
        | "draft"
        | "review"
        | "scheduled"
        | "published"
        | "archived"
        | "rejected"
      campaign_status: "draft" | "active" | "paused" | "finished"
      city_status: "active" | "inactive" | "preparing"
      layout_status: "draft" | "published" | "archived"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      ai_run_status: ["pending", "success", "error"],
      app_role: [
        "super_admin",
        "city_editor",
        "journalist",
        "moderator",
        "ad_manager",
        "seo_manager",
      ],
      article_status: [
        "draft",
        "review",
        "scheduled",
        "published",
        "archived",
        "rejected",
      ],
      campaign_status: ["draft", "active", "paused", "finished"],
      city_status: ["active", "inactive", "preparing"],
      layout_status: ["draft", "published", "archived"],
    },
  },
} as const
