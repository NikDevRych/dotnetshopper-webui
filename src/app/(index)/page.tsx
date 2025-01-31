import CardList from "@/components/card/card-list";

export default function Home() {
  return (
    <div className="p-4">
      <ul className="flex flex-wrap gap-2">
        <CardList />
      </ul>
    </div>
  );
}
