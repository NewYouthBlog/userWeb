import { MagicCard } from "../ui/magic-card";

export default function ArcticleCard() {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg grid grid-cols-1 sm:grid-cols-2">
      <img className="w-full h-48 object-cover" src="/2.jpg" alt="示例图片" />
      <div className="p-4 flex flex-col justify-between">
        <h2 className="text-xl font-bold mb-2">卡片标题</h2>
        <p className="text-gray-700">这是卡片的简要内容，提供一些基本信息。</p>
      </div>
    </div>
  );
}
