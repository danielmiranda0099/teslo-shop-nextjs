import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  }
}

const CATEGORIES = ["men", "womens", "kids"];

export default function CategoryPage({params}: Props) {
  const { id } = params;

  if(!CATEGORIES.includes(id)){
    notFound();
  }

  return (
    <div>CategoryPage { id }</div>
  )
}
