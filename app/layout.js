import "./globals.css";
import "./theme.css";

export const metadata = {
  title: "n8n RAG Chatbot",
  description: "RAG Chatbot powered by n8n workflows, pgvector, and OpenAI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="w-full">
      <body className="w-full">
        {children}
      </body>
    </html>
  );
}
