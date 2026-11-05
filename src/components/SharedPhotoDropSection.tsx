import React from 'react';
import { Upload } from 'lucide-react';
import { PartyPhotoItem, ThemeConfig } from '../types';

interface SharedPhotoDropSectionProps {
  theme: ThemeConfig;
  partyPhotos: PartyPhotoItem[];
  photoUploaderName: string;
  onPhotoUploaderNameChange: (value: string) => void;
  photoCaption: string;
  onPhotoCaptionChange: (value: string) => void;
  onUploadPhoto: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SharedPhotoDropSection: React.FC<SharedPhotoDropSectionProps> = ({
  theme,
  partyPhotos,
  photoUploaderName,
  onPhotoUploaderNameChange,
  photoCaption,
  onPhotoCaptionChange,
  onUploadPhoto
}) => {
  return (
    <section className="py-16 px-4 max-w-5xl mx-auto">
      <div className={`p-6 sm:p-10 rounded-3xl border ${theme.borderStrong} ${theme.bgCard} shadow-2xl`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <h2 className="font-ruqaa text-3xl sm:text-4xl">شاركنا لقطاتك من الحفل</h2>
            <p className={`text-xs sm:text-sm ${theme.textSecondary} leading-relaxed`}>
              التقطت صورة جميلة في الخطوبة؟ ارفعها هنا لتبقى في ألبوم ذكرياتنا المشترك.
            </p>

            <div className="space-y-3 pt-2">
              <input
                type="text"
                placeholder="اسمك (مثال: ابن عم العريس)"
                value={photoUploaderName}
                onChange={(e) => onPhotoUploaderNameChange(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border ${theme.border} bg-transparent text-xs sm:text-sm focus:border-[#D4AF37] focus:outline-none`}
              />
              <input
                type="text"
                placeholder="تعليق قصير على الصورة..."
                value={photoCaption}
                onChange={(e) => onPhotoCaptionChange(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border ${theme.border} bg-transparent text-xs sm:text-sm focus:border-[#D4AF37] focus:outline-none`}
              />

              <label
                className={`w-full py-3.5 px-5 rounded-xl ${theme.buttonBg} text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:opacity-95 transition`}
              >
                <Upload className="w-4 h-4" />
                <span>اختر صورة من هاتفك لإضافتها للألبوم</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onUploadPhoto}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Live Uploaded Party Photos Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {partyPhotos.map((photo) => (
              <div
                key={photo.id}
                className={`rounded-2xl overflow-hidden border ${theme.border} ${theme.bgSecondary} shadow-lg group`}
              >
                <div className="h-44 overflow-hidden">
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-3.5">
                  <p className="text-xs font-bold text-[#D4AF37]">بعدسة: {photo.uploader}</p>
                  <p className="text-xs sm:text-sm mt-0.5">{photo.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SharedPhotoDropSection;

