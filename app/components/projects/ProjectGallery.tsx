type GalleryItem = {
  label: string;
  sublabel: string;
};

type Props = {
  items: GalleryItem[];
};

export default function ProjectGallery({ items }: Props) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item, i) => (
        <div
          key={i}
          className="aspect-video bg-[#111827] border border-dashed border-[#1a2235] rounded-lg flex flex-col items-center justify-center gap-3 p-4 hover:border-[#c9a84c]/20 transition-colors"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1a2235"
            strokeWidth={1.5}
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 15l-5-5L5 21" />
          </svg>
          <div className="text-center">
            <p className="text-[#94a3b8] text-sm font-medium">{item.label}</p>
            <p className="text-[#94a3b8]/50 text-xs mt-1">{item.sublabel}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
