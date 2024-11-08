import { tags } from "@/@types/tag";

export default function TagsButton({ tagsName }: { tagsName: string }) {
  return (
    <div className="tag flex items-center px-3 py-1 text-sm font-medium text-gray-700 bg-customFg4 rounded-xl">
      {tagsName}
    </div>
  );
}
