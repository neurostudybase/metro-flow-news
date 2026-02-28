import { useState } from 'react';
import { Send } from 'lucide-react';

const ReportNewsWidget = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setName('');
    setContact('');
    setMessage('');
  };

  return (
    <div className="bg-card rounded-lg p-4">
      <h3 className="font-bold text-sm mb-3">Отправить новость</h3>
      {sent ? (
        <p className="text-sm text-primary">Спасибо! Мы свяжемся с вами.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="text"
            placeholder="Ваше имя"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full text-sm px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
            required
          />
          <input
            type="text"
            placeholder="Телефон или e-mail"
            value={contact}
            onChange={e => setContact(e.target.value)}
            className="w-full text-sm px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
            required
          />
          <textarea
            placeholder="Ваше сообщение"
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={3}
            className="w-full text-sm px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            required
          />
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground text-sm font-medium py-2 rounded-md hover:opacity-90 transition-opacity"
          >
            <Send className="w-4 h-4" />
            Отправить
          </button>
        </form>
      )}
    </div>
  );
};

export default ReportNewsWidget;
