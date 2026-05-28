"use client";

import React, { useState, useRef } from 'react';

export default function BuyNowButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({
    name: '', mobile: '', pincode: '', flat: '', area: '', city: '', state: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => { setStep(1); setScreenshot(null); setScreenshotPreview(null); }, 300);
  };

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setScreenshot(file);
      setScreenshotPreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      {/* Button Row */}
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <button
          onClick={() => setIsOpen(true)}
          suppressHydrationWarning
          className="flex-1 py-4 bg-[linear-gradient(110deg,#29425e_0%,#395c80_100%)] text-white rounded-2xl font-bold text-[14px] md:text-[16px] uppercase flex items-center justify-center gap-2 hover:shadow-lg transition-all shadow-sm font-malayalam hover:scale-[1.02]"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17 18c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm0-3l1.1-2h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1v2h2l3.6 7.59zm3.5-3v-3h-3l4-4 4 4h-3v3h-2z"/></svg>
          ഇപ്പോൾ വാങ്ങുക
        </button>

        <a
          href="https://wa.me/917994621148?text=Hi%2C%20I%20want%20to%20book%20the%20Shaa%20David%20English%20Companion%20book!"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-2xl font-bold text-[14px] md:text-[16px] flex items-center justify-center gap-2 hover:shadow-lg transition-all shadow-sm font-malayalam hover:scale-[1.02]"
        >
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp-ൽ ബുക്ക് ചെയ്യൂ
        </a>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] font-malayalam"
            style={{ animation: 'modalFadeIn 0.2s ease-out forwards' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-[linear-gradient(110deg,#29425e_0%,#395c80_100%)]">
              <h2 className="text-xl font-medium text-white">സുരക്ഷിതമായ ചെക്ക്ഔട്ട്</h2>
              <button onClick={handleClose} className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Stepper */}
            <div className="flex border-b border-gray-100 bg-white z-10 relative">
              {['വിലാസം', 'പേയ്‌മെന്റ്', 'സ്ഥിരീകരിക്കുക'].map((lbl, idx) => {
                const s = idx + 1;
                const isActive = step === s;
                const isPast = step > s;
                return (
                  <div key={lbl} className={`flex-1 text-center py-3.5 text-sm font-medium border-b-[3px] transition-all duration-300 ${isActive ? 'border-[#395c80] text-[#395c80]' : isPast ? 'border-green-500 text-green-600' : 'border-transparent text-gray-400'}`}>
                    {lbl}
                  </div>
                );
              })}
            </div>

            <div className="p-6 overflow-y-auto bg-gray-50 flex-1">

              {/* Step 1: Address */}
              {step === 1 && (
                <form id="checkout-form" onSubmit={handleNext} className="space-y-4">
                  <h3 className="text-lg font-medium text-[#0c1622] mb-4">ഡെലിവറി വിലാസം ചേർക്കുക</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">പൂർണ്ണനാമം</label>
                      <input type="text" required value={address.name} onChange={e => setAddress({...address, name: e.target.value})} className="w-full border border-gray-300 rounded-xl px-3 py-2.5 outline-none focus:border-[#395c80] focus:ring-1 focus:ring-[#395c80] transition-all bg-white shadow-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">മൊബൈൽ നമ്പർ</label>
                      <input type="tel" required value={address.mobile} onChange={e => setAddress({...address, mobile: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2.5 outline-none focus:border-[#395c80] focus:ring-1 focus:ring-[#395c80] transition-all bg-white shadow-sm" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">പിൻ കോഡ്</label>
                      <input type="text" required value={address.pincode} onChange={e => setAddress({...address, pincode: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2.5 outline-none focus:border-[#395c80] focus:ring-1 focus:ring-[#395c80] transition-all bg-white shadow-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ഫ്ലാറ്റ്, വീട്ടു നമ്പർ</label>
                      <input type="text" required value={address.flat} onChange={e => setAddress({...address, flat: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2.5 outline-none focus:border-[#395c80] focus:ring-1 focus:ring-[#395c80] transition-all bg-white shadow-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">സ്ഥലം, തെരുവ്, വില്ലേജ്</label>
                    <textarea required rows={3} value={address.area} onChange={e => setAddress({...address, area: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2.5 outline-none focus:border-[#395c80] focus:ring-1 focus:ring-[#395c80] transition-all bg-white shadow-sm resize-none"></textarea>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">നഗരം</label>
                      <input type="text" required value={address.city} onChange={e => setAddress({...address, city: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2.5 outline-none focus:border-[#395c80] focus:ring-1 focus:ring-[#395c80] transition-all bg-white shadow-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">സംസ്ഥാനം</label>
                      <input type="text" required value={address.state} onChange={e => setAddress({...address, state: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2.5 outline-none focus:border-[#395c80] focus:ring-1 focus:ring-[#395c80] transition-all bg-white shadow-sm" />
                    </div>
                  </div>
                </form>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <form id="checkout-form" onSubmit={handleNext} className="space-y-6">
                  <h3 className="text-lg font-medium text-[#0c1622]">പേയ്‌മെന്റ് രീതി തിരഞ്ഞെടുക്കുക</h3>
                  <div className="space-y-3">

                    {/* COD Option */}
                    <label className={`flex items-start gap-3 p-3 border rounded-2xl cursor-pointer transition-all bg-white shadow-sm ${paymentMethod === 'cod' ? 'border-[#395c80] ring-1 ring-[#395c80]/20' : 'border-gray-200 hover:border-gray-300'}`}>
                      <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="mt-0.5 w-4 h-4 text-[#395c80] focus:ring-[#395c80]" />
                      <div>
                        <div className="font-medium text-[#0c1622] text-sm">ക്യാഷ് ഓൺ ഡെലിവറി (ക്യാഷ്/യുപിഐ)</div>
                        <div className="text-xs text-gray-500 mt-0.5">വാതിൽക്കൽ പണമടയ്ക്കുക.</div>
                      </div>
                    </label>

                    {/* UPI Option */}
                    <label className={`flex items-start gap-3 p-3 border rounded-2xl cursor-pointer transition-all bg-white shadow-sm ${paymentMethod === 'upi' ? 'border-[#395c80] ring-1 ring-[#395c80]/20' : 'border-gray-200 hover:border-gray-300'}`}>
                      <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="mt-0.5 w-4 h-4 text-[#395c80] focus:ring-[#395c80]" />
                      <div className="w-full">
                        <div className="font-medium text-[#0c1622] text-sm flex items-center gap-2">
                          യുപിഐ ആപ്പുകൾ
                          <span className="flex gap-1">
                            <span className="bg-gray-50 border border-gray-200 rounded px-1.5 text-[9px] font-bold text-gray-600 tracking-wide uppercase">GPay</span>
                            <span className="bg-gray-50 border border-gray-200 rounded px-1.5 text-[9px] font-bold text-gray-600 tracking-wide uppercase">PhonePe</span>
                          </span>
                        </div>

                        {paymentMethod === 'upi' && (
                          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 items-stretch">
                            {/* QR Code */}
                            <div className="flex flex-col items-center justify-center bg-gray-50 border border-gray-200 rounded-xl p-2 gap-1 relative">
                              <p className="text-xs text-gray-500 font-medium mb-1">QR സ്‌കാൻ ചെയ്ത് പേ ചെയ്യുക</p>
                              <img
                                src="/upi-qr.png"
                                alt="UPI QR Code"
                                className="w-24 h-24 sm:w-28 sm:h-28 object-contain rounded-lg border border-gray-200 shadow-sm bg-white p-1"
                              />
                              <div className="text-center mt-1">
                                <p className="text-[10px] text-gray-400 leading-tight">UPI ID</p>
                                <p className="text-xs font-bold text-[#395c80] tracking-wide select-all leading-tight">shaadavid@upi</p>
                              </div>
                            </div>

                            {/* Screenshot Upload */}
                            <div className="flex flex-col">
                              <div
                                onClick={() => fileInputRef.current?.click()}
                                className={`flex-1 relative border-2 border-dashed rounded-xl p-2 flex flex-col items-center justify-center cursor-pointer transition-all text-center ${screenshotPreview ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-[#395c80] bg-white hover:bg-blue-50/30'}`}
                              >
                                {screenshotPreview ? (
                                  <div className="flex flex-col items-center gap-1">
                                    <img src={screenshotPreview} alt="Payment screenshot" className="max-h-24 rounded-lg object-contain shadow" />
                                    <span className="text-[10px] text-green-600 font-medium line-clamp-1">✓ {screenshot?.name}</span>
                                    <span className="text-[10px] text-gray-400">മാറ്റാൻ ക്ലിക്ക് ചെയ്യുക</span>
                                  </div>
                                ) : (
                                  <div className="flex flex-col items-center gap-1">
                                    <svg className="w-6 h-6 text-gray-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-xs text-gray-500 font-medium leading-tight">സ്‌ക്രീൻഷോട്ട് അപ്‌ലോഡ്<br/>ചെയ്യുക <span className="text-red-500">*</span></span>
                                    <span className="text-[9px] text-gray-400">JPG, PNG (max 5MB)</span>
                                  </div>
                                )}
                                <input
                                  ref={fileInputRef}
                                  type="file"
                                  accept="image/*"
                                  required={paymentMethod === 'upi'}
                                  onChange={handleScreenshotChange}
                                  className="hidden"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </label>

                  </div>
                </form>
              )}

              {/* Step 3: Confirmation */}
              {step === 3 && (
                <div className="text-center py-12 flex flex-col items-center justify-center">
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-green-400/20 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                    <div className="w-24 h-24 bg-gradient-to-tr from-emerald-400 to-green-500 rounded-full flex items-center justify-center relative shadow-[0_0_30px_rgba(52,211,153,0.4)] z-10">
                      <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none">
                        <path className="animate-[drawCheck_0.5s_ease-out_0.3s_forwards]" style={{ strokeDasharray: 40, strokeDashoffset: 40 }} stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-3xl font-light text-[#0c1622] mb-3 opacity-0 animate-[fadeUp_0.5s_ease-out_0.4s_forwards]">ഓർഡർ സ്ഥിരീകരിച്ചു!</h3>
                  <p className="text-gray-500 text-[16px] max-w-md mx-auto mb-6 leading-relaxed opacity-0 animate-[fadeUp_0.5s_ease-out_0.4s_forwards]">
                    നന്ദി, <strong className="text-[#0c1622] font-medium">{address.name}</strong>. നിങ്ങളുടെ <strong className="text-[#395c80] font-medium">ഷാ ഡേവിഡ് ഇംഗ്ലീഷ് കമ്പാനിയൻ</strong> ഉടൻ എത്തും.
                  </p>
                  {paymentMethod === 'upi' && (
                    <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 max-w-sm mx-auto mb-6 opacity-0 animate-[fadeUp_0.5s_ease-out_0.5s_forwards]">
                      നിങ്ങളുടെ UPI സ്‌ക്രീൻഷോട്ട് ലഭിച്ചു. വെരിഫിക്കേഷൻ പൂർത്തിയായ ശേഷം ഓർഡർ ഡിസ്‌പാച്ച് ചെയ്യും.
                    </p>
                  )}
                  <div className="w-full max-w-sm mx-auto opacity-0 animate-[fadeUp_0.5s_ease-out_0.6s_forwards] relative group">
                    <div className="relative bg-white border border-gray-100 rounded-2xl p-6 text-left shadow-xl">
                      <div className="grid grid-cols-2 gap-y-4 gap-x-4 text-sm">
                        <div className="col-span-2">
                          <div className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-1">ഷിപ്പിംഗ് വിലാസം</div>
                          <div className="font-medium text-[#0c1622]">{address.name}<br /><span className="text-gray-500 font-normal">{address.flat}, {address.area}<br />{address.city}, {address.state} {address.pincode}</span></div>
                        </div>
                        <div className="col-span-2">
                          <div className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-1">പേയ്‌മെന്റ് രീതി</div>
                          <div className="font-medium text-[#0c1622]">{paymentMethod === 'cod' ? 'ക്യാഷ് ഓൺ ഡെലിവറി' : 'UPI പേയ്‌മെന്റ്'}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {step < 3 && (
              <div className="border-t border-gray-100 p-5 bg-white flex justify-between items-center gap-4">
                <div className="text-[17px] font-bold text-[#0c1622]">
                  ആകെ: <span className="text-[#395c80] ml-1">₹999.00</span>
                </div>
                <div className="flex gap-3">
                  {step > 1 && (
                    <button type="button" onClick={() => setStep(step - 1)} className="px-6 py-2.5 rounded-md font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                      പുറകിലേക്ക്
                    </button>
                  )}
                  <button
                    type="submit"
                    form="checkout-form"
                    disabled={step === 2 && paymentMethod === 'upi' && !screenshot}
                    className="px-8 py-2.5 bg-[linear-gradient(110deg,#29425e_0%,#395c80_100%)] hover:shadow-lg text-white rounded-xl font-medium shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {step === 1 ? 'ഈ വിലാസത്തിലേക്ക് അയക്കുക' : 'ഓർഡർ നൽകുക'}
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="border-t border-gray-100 p-5 bg-white flex justify-center">
                <button onClick={handleClose} className="px-8 py-2.5 bg-[linear-gradient(110deg,#29425e_0%,#395c80_100%)] hover:shadow-lg text-white rounded-xl font-medium shadow-sm transition-all">
                  ഷോപ്പിംഗ് തുടരുക
                </button>
              </div>
            )}
          </div>

          <style>{`
            @keyframes modalFadeIn { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
            @keyframes scaleIn { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            @keyframes drawCheck { to { stroke-dashoffset: 0; } }
            @keyframes fadeUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
          `}</style>
        </div>
      )}
    </>
  );
}
