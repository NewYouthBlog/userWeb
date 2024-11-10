export default function TagsButton({
  tagsName,
  Click,
}: {
  tagsName: string;
  Click?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      className="tag flex items-center px-3 py-1 text-sm font-medium text-gray-700 bg-customFg4 rounded-xl"
      onClick={Click}
    >
      {tagsName}
    </button>
  );
}
