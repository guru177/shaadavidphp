"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Play, Image as ImageIcon, Video, Maximize2, ChevronLeft, ChevronRight, X, Maximize, Minimize } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  category: string;
}

interface GalleryVideo {
  id: number;
  thumbnail: string;
  title: string;
  duration: string;
  videoUrl: string;
  category?: string;
}

type GalleryItem = GalleryImage | GalleryVideo;

const galleryData: { images: GalleryImage[], videos: GalleryVideo[] } = {
  images: [
    { id: 1, src: '/images/IMG_6585.webp', title: 'ക്ലാസ്സ് റൂം വിശേഷങ്ങൾ', category: 'ക്ലാസ്സുകൾ' },
    { id: 2, src: '/images/IMG_6586.webp', title: 'പഠന രീതികൾ', category: 'പഠനം' },
    { id: 3, src: '/images/IMG_6587.webp', title: 'വിദ്യാർത്ഥികൾ', category: 'ക്യാമ്പസ്' },
    { id: 4, src: '/images/IMG_6588.webp', title: 'സെമിനാർ ഹാൾ', category: 'പരിപാടികൾ' },
    { id: 5, src: '/images/IMG_6589.webp', title: 'ഗ്രൂപ്പ് സ്റ്റഡി', category: 'പഠനം' },
    { id: 6, src: '/images/IMG_6590.webp', title: 'ലൈബ്രറി', category: 'വായന' },
    { id: 7, src: '/images/IMG_6591.webp', title: 'ഡിജിറ്റൽ ക്ലാസ്സുകൾ', category: 'സാങ്കേതിക വിദ്യ' },
    { id: 8, src: '/images/IMG_6592.webp', title: 'ഭാഷാ പഠനം', category: 'ഇംഗ്ലീഷ്' },
    { id: 9, src: '/images/IMG_6593.webp', title: 'ടീച്ചേഴ്സ് മീറ്റിംഗ്', category: 'ടീം' },
    { id: 10, src: '/images/IMG_6594.webp', title: 'ക്രിയേറ്റീവ് വർക്കുകൾ', category: 'കല' },
    { id: 11, src: '/images/IMG_6595.webp', title: 'പരീക്ഷാ തയ്യാറെടുപ്പ്', category: 'പഠനം' },
    { id: 12, src: '/images/IMG_6596.webp', title: 'കരിയർ ഗൈഡൻസ്', category: 'സെമിനാർ' },
    { id: 13, src: '/images/IMG_6597.webp', title: 'ക്യാമ്പസ് ലൈഫ്', category: 'ക്യാമ്പസ്' },
    { id: 14, src: '/images/IMG_6598.webp', title: 'ലാബ് സൗകര്യങ്ങൾ', category: 'സാങ്കേതിക വിദ്യ' },
    { id: 15, src: '/images/IMG_6599.webp', title: 'വിദ്യാഭ്യാസ ചർച്ചകൾ', category: 'ടീം' },
    { id: 16, src: '/images/IMG_6600.webp', title: 'പ്രോജക്റ്റ് വർക്ക്', category: 'പഠനം' },
    { id: 17, src: '/images/IMG_6601.webp', title: 'പഠന സഹായികൾ', category: 'വായന' },
    { id: 18, src: '/images/IMG_6602.webp', title: 'ഗ്രൂപ്പ് ഡിസ്കഷൻ', category: 'പഠനം' },
    { id: 19, src: '/images/IMG_6603.webp', title: 'ഭാഷാ വൈദഗ്ദ്ധ്യം', category: 'ഇംഗ്ലീഷ്' },
    { id: 20, src: '/images/IMG_6605.webp', title: 'ഇന്ററാക്ടീവ് സെഷൻ', category: 'ക്ലാസ്സുകൾ' },
    { id: 21, src: '/images/IMG_6606.webp', title: 'പഠന യാത്രകൾ', category: 'പരിപാടികൾ' },
    { id: 22, src: '/images/IMG_6608.webp', title: 'പ്രഭാഷണങ്ങൾ', category: 'സെമിനാർ' },
    { id: 23, src: '/images/IMG_6611.webp', title: 'ഭാഷാ പരിശീലനം', category: 'ഇംഗ്ലീഷ്' },
    { id: 24, src: '/images/IMG_6612.webp', title: 'കമ്പനി വിസിറ്റ്', category: 'ടീം' },
    { id: 25, src: '/images/IMG_6613.webp', title: 'ഫൈനൽ പ്രോജക്റ്റ്', category: 'പഠനം' },
  ],
  videos: [
    {
      id: 101,
      thumbnail: '/images/video-thumbnail.webp',
      title: 'ഇംഗ്ലീഷ് പഠനം ലളിതമായി',
      duration: '4:20',
      videoUrl: '/images/LEARN ENG(3).webm',
      category: 'വീഡിയോ'
    },
  ]
};

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<'images' | 'videos'>('images');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const currentItems: GalleryItem[] = activeTab === 'images' ? galleryData.images : galleryData.videos;
  const selectedItem = selectedIndex !== null ? currentItems[selectedIndex] : null;

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % currentItems.length);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + currentItems.length) % currentItems.length);
    }
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!document.fullscreenElement) {
      modalRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setSelectedIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#29425e]">
      <Header />

      <main className="relative min-h-screen w-full flex flex-col font-sans">
        {/* Hero Section */}
        <div className="w-full min-h-[50vh] sm:min-h-[60vh] lg:min-h-[70vh] relative overflow-hidden flex items-center justify-center text-center px-4 pt-28 lg:pt-32">
          <div className="absolute inset-0 z-0">
            <Image
              src="/blog-bg.webp"
              alt="Gallery Background"
              fill
              className="object-cover opacity-50 grayscale-[10%]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0c1622] via-[#0c1622]/90 to-[#1a2c42]/80"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFC] via-transparent to-transparent"></div>
          </div>

          <div className="absolute inset-0 opacity-10 z-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#395c80] rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-pulse z-0"></div>
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-emerald-500 rounded-full mix-blend-screen filter blur-[150px] opacity-10 z-0"></div>

          <div className="relative z-10 max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-12 sm:pb-16 lg:pb-24 px-4 font-malayalam">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-6 sm:mb-8 tracking-tight drop-shadow-lg leading-[1.4]">
              ഗാലറി വിശേഷങ്ങൾ
            </h1>
            <p className="text-white/90 text-base sm:text-xl max-w-3xl mx-auto leading-[1.6] font-medium drop-shadow-md px-2">
              ഞങ്ങളുടെ യാത്രയും നൂതനമായ ആശയങ്ങളും പ്രവർത്തനങ്ങളും ഗാലറിയിലൂടെ കാണാം.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full max-w-[1920px] mx-auto px-5 md:px-8 xl:px-12 2xl:px-16 pb-32 relative z-10 -mt-10 sm:-mt-16 lg:-mt-20">

          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-white p-1.5 rounded-2xl shadow-xl shadow-gray-200/50 flex gap-2 border border-gray-100">
              <button
                onClick={() => setActiveTab('images')}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all font-malayalam ${activeTab === 'images'
                    ? 'bg-[#29425e] text-white shadow-lg shadow-[#29425e]/20'
                    : 'hover:bg-gray-50 text-gray-500'
                  }`}
              >
                <ImageIcon size={20} />
                ചിത്രങ്ങൾ
              </button>
              <button
                onClick={() => setActiveTab('videos')}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all font-malayalam ${activeTab === 'videos'
                    ? 'bg-[#29425e] text-white shadow-lg shadow-[#29425e]/20'
                    : 'hover:bg-gray-50 text-gray-500'
                  }`}
              >
                <Video size={20} />
                വീഡിയോകൾ
              </button>
            </div>
          </div>

          {/* Gallery Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {currentItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layoutId={`item-${item.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer bg-gray-200 shadow-lg"
                  onClick={() => setSelectedIndex(idx)}
                >
                  <Image
                    src={activeTab === 'images' ? (item as GalleryImage).src : (item as GalleryVideo).thumbnail}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/30 scale-90 group-hover:scale-100 transition-all duration-300">
                      {activeTab === 'images' ? <Maximize2 size={24} /> : <Play fill="currentColor" size={24} className="ml-1" />}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Modal / Lightbox Slideshow - MOVED OUTSIDE MAIN FOR STACKING CONTEXT */}
      <AnimatePresence>
        {selectedIndex !== null && selectedItem && (
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 !z-[100000] flex items-center justify-center p-4 md:p-10 overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-[#0c1622]/40 backdrop-blur-[40px] saturate-150"
              onClick={() => setSelectedIndex(null)}
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`relative transition-all duration-500 ${isFullscreen
                  ? 'w-screen h-screen max-w-none max-h-none rounded-none border-none'
                  : 'w-full max-w-6xl h-full max-h-[85vh] rounded-[40px] border border-white/20'
                } overflow-hidden bg-black/10 backdrop-blur-md shadow-2xl flex items-center justify-center group`}
            >
              {/* Static Buttons - Outside the content animation key */}
              <button
                onClick={handlePrev}
                className={`absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white transition-all border border-white/20 z-50 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0`}
              >
                <ChevronLeft size={32} />
              </button>

              <button
                onClick={handleNext}
                className={`absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white transition-all border border-white/20 z-50 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0`}
              >
                <ChevronRight size={32} />
              </button>

              <div className="absolute top-6 right-6 flex gap-3 z-50 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={toggleFullscreen}
                  className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white transition-all border border-white/20"
                >
                  {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                </button>
                <button
                  onClick={() => setSelectedIndex(null)}
                  className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white transition-all border border-white/20"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Animated Content Layer */}
              <div className="relative w-full h-full flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedItem.id}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {activeTab === 'images' ? (
                      <div className={`relative w-full h-full transition-all duration-500 ${isFullscreen ? 'p-0' : 'p-4 md:p-8'}`}>
                        <Image
                          src={(selectedItem as GalleryImage).src}
                          alt={selectedItem.title}
                          fill
                          className="object-contain"
                          priority
                        />
                      </div>
                    ) : (
                      <video
                        src={(selectedItem as GalleryVideo).videoUrl}
                        controls
                        autoPlay
                        muted
                        playsInline
                        className="w-full h-full object-contain"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
