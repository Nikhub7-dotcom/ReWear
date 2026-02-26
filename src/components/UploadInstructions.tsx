import { CheckCircle2, Info, Camera, Sun, Maximize, Tag } from "lucide-react";

export default function UploadInstructions() {
  const guidelines = [
    { icon: Info, text: "Ensure clothes are washed and ironed" },
    { icon: Maximize, text: "Use plain background" },
    { icon: Sun, text: "Avoid shadows" },
    { icon: Camera, text: "Show full front view" },
    { icon: Tag, text: "Ensure brand tag is visible (if available)" },
    { icon: Info, text: "Avoid blurry images" }
  ];

  return (
    <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
          <CheckCircle2 className="h-6 w-6 text-emerald-600" />
        </div>
        <h3 className="text-xl font-bold text-stone-900">Upload Guidelines</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {guidelines.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl">
            <item.icon className="h-4 w-4 text-stone-400" />
            <span className="text-sm text-stone-600 font-medium">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
