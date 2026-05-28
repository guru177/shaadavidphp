"use client";

import React from 'react';
import Link from 'next/link';

export default function ProductSection() {
  return (
    <section className="relative w-full bg-white pt-[120px] md:pt-[160px] pb-[80px] md:pb-[100px] px-5 md:px-8 xl:px-12 2xl:px-16 max-w-[1920px] mx-auto overflow-hidden">

      <div className="relative w-full rounded-[32px] sm:rounded-[40px] 2xl:rounded-[50px] bg-[linear-gradient(110deg,#29425e_0%,#395c80_30%,#0c1622_50%,#395c80_70%,#29425e_100%)] bg-[length:200%_auto] p-7 sm:p-12 lg:p-16 2xl:p-24 overflow-hidden flex flex-col lg:flex-row items-stretch gap-12 lg:gap-20 shadow-2xl">

        {/* Background is purely the shimmering gradient now */}

        {/* Left: Product Image */}
        <div className="w-full lg:w-[40%] relative flex flex-col justify-center items-center z-10">
          <div className="relative transform hover:scale-105 transition-transform duration-500 m-auto overflow-hidden rounded-[30px] shadow-2xl">
            {/* Soft glow behind book */}
            <div className="absolute inset-0 bg-white/20 blur-[50px] rounded-full"></div>
            <img loading="lazy"
              src="/product.webp"
              alt="Shaa David's English Companion"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/product1.webp";
                e.currentTarget.className = "w-full h-full object-cover";
              }}
            />
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="w-full lg:w-[60%] flex flex-col justify-center items-start z-10">
          <span className="inline-flex rounded-full px-5 py-2 2xl:px-8 2xl:py-3 text-sm md:text-base 2xl:text-xl font-bold text-[#29425e] bg-white mb-6 shadow-xl cursor-default">
            ഔദ്യോഗിക പുസ്തകം
          </span>

          <h2 className="text-3xl sm:text-5xl xl:text-6xl 2xl:text-7xl font-malayalam font-extrabold text-white leading-[1.3] mb-6 tracking-tight drop-shadow-md">
            ഷാ ഡേവിഡിന്റെ <br /> ഇംഗ്ലീഷ് കമ്പാനിയൻ
          </h2>

          <p className="text-white/90 text-lg md:text-xl 2xl:text-2xl font-malayalam leading-[1.8] 2xl:leading-[2] w-full font-medium mb-8">
            മലയാളത്തിലൂടെ വളരെ എളുപ്പത്തിൽ ഇംഗ്ലീഷ് പഠിക്കാൻ സഹായിക്കുന്ന സമ്പൂർണ്ണ ഗൈഡ്. വ്യാകരണ നിയമങ്ങളുടെ ഭയമില്ലാതെ ആത്മവിശ്വാസത്തോടെ സംസാരിക്കാൻ ഇന്ന് തന്നെ സ്വന്തമാക്കൂ.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 mb-10 w-full">
            {/* Price Block with SALE badge */}
            <div className="flex flex-col w-full sm:w-auto relative">
              {/* SALE Badge */}
              <span className="absolute -top-4 -right-3 bg-red-500 text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg animate-pulse z-10">
                SALE
              </span>
              <div className="bg-black/20 px-6 py-3 rounded-2xl backdrop-blur-sm border border-white/10">
                <span className="text-white/60 line-through text-sm md:text-base font-bold">₹1,999</span>
                <span className="block text-3xl md:text-4xl 2xl:text-5xl font-extrabold text-white">₹999</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              {/* Buy Now */}
              <Link href="/product" className="flex items-center justify-center gap-3 px-8 2xl:px-12 py-4 2xl:py-5 bg-white text-[#29425e] hover:bg-gray-50 transition-all transform hover:scale-105 shadow-xl rounded-full group whitespace-nowrap">
                <span className="font-malayalam font-bold text-base 2xl:text-xl tracking-wide">ഇപ്പോൾ വാങ്ങുക</span>
                <svg className="w-5 h-5 2xl:w-6 2xl:h-6 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              {/* Book on WhatsApp */}
              <a
                href="https://wa.me/917994621148?text=Hi%2C%20I%20want%20to%20book%20the%20Shaa%20David%20English%20Companion%20book!"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 2xl:px-12 py-4 2xl:py-5 bg-[#25D366] hover:bg-[#20bd5a] text-white transition-all transform hover:scale-105 shadow-xl rounded-full group whitespace-nowrap"
              >
                {/* WhatsApp Icon */}
                <svg className="w-5 h-5 2xl:w-6 2xl:h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="font-malayalam font-bold text-base 2xl:text-xl tracking-wide">WhatsApp-ൽ ബുക്ക് ചെയ്യൂ</span>
              </a>
            </div>
          </div>

          {/* Features List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {[
              "100+ പ്രായോഗിക പാഠങ്ങൾ",
              "യഥാർത്ഥ ജീവിത സംഭാഷണങ്ങൾ",
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-black/10 px-4 py-3 rounded-xl border border-white/5 backdrop-blur-sm">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-semibold text-white/90 text-sm md:text-base 2xl:text-lg">{feature}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
