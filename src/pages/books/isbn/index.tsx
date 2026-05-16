import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";

import { getBookByISBN } from "@/lib/api/book/api";
import { Book } from "@/components/Book";
import { cx } from "class-variance-authority";
import { Button } from "@/components/ui/button";
import { ChevronLeftCircle } from "lucide-react";

export default function BookByISBNPage() {
  const { isbn = "" } = useParams<{ isbn: string }>();
  const navigate = useNavigate();

  const getBookQuery = useQuery({
    queryKey: ["books", "isbn", isbn],
    queryFn: () => getBookByISBN(isbn),
    enabled: Boolean(isbn),
    select(response) {
      if (!response.data) {
        return undefined;
      }
      return response.data;
    },
  });

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        {getBookQuery.data && (
          <>
            <section
              className={cx(
                "flex flex-col items-center justify-center gap-4",
                "bg-linear-to-b from-emerald-800 to-emerald-900",
                "py-8",
                "min-h-3/4",
                "relative",
              )}
              id="hero"
            >
              <nav className={cx("absolute top-2 left-2")}>
                <Button
                  variant="ghost"
                  className="text-taupe-50"
                  onClick={handleBackClick}
                >
                  <ChevronLeftCircle size={32} /> Back
                </Button>
              </nav>
              <Book book={getBookQuery.data} />
              <header className="text-taupe-50 text-center">
                <h1 className="font-heading text-xl ">
                  {getBookQuery.data.title}
                </h1>
                <p className="text-sm">{getBookQuery.data.author}</p>
              </header>
            </section>
            <section className="p-4 space-y-4">
              <header>
                <h1 className="font-heading text-xl">From the publisher</h1>
                <p>{getBookQuery.data.publisher}</p>
              </header>
              <p className="text-sm">{getBookQuery.data.description}</p>
            </section>
          </>
        )}
      </div>
    </>
  );
}
