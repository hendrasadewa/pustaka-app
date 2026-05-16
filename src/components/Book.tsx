import type { BookEntity } from "@/lib/api/book/entity";
import { cx } from "class-variance-authority";

interface Props {
  book: BookEntity;
  isDisabled?: boolean;
}
export function Book({ book }: Props) {
  const containerStyles = cx(
    "h-60 w-40 md:h-72 md:w-52",
    "bg-emerald-700",

    // Background: Highly specific multi-stop gradient
    "bg-[linear-gradient(to_right,rgb(49,86,52)_3px,rgba(255,255,255,0.5)_5px,rgba(255,255,255,0.25)_7px,rgba(255,255,255,0.25)_10px,transparent_12px,transparent_16px,rgba(255,255,255,0.25)_17px,transparent_22px)]",

    // Shadow: Combined drop shadow and inner shadow
    "shadow-[0_0_5px_-1px_black,inset_-1px_1px_2px_rgba(255,255,255,0.5)]",

    // Border Radius
    "rounded",
  );

  return (
    <article className={containerStyles} id={`book-${book.isbn}`}>
      <div className="pl-7 p-3 flex flex-col justify-between h-full">
        <header className="text-emerald-50">
          <p className="text-xs">{book.publisher}</p>
          <h3 className="text-xl font-semibold leading-6 ">
            {book.title}
          </h3>
        </header>
        <footer className={cx("border-l pl-2", "text-emerald-50")}>
          <p className="text-sm">{book.author}</p>
        </footer>
      </div>
      <p></p>
    </article>
  );
}
