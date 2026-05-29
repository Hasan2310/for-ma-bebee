import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import hello from '/stiker/hello.gif';
import happy from '/stiker/happy.gif';
import sad from '/stiker/sad.gif';
import hbd from '/stiker/hbd.gif';
import hehe from '/stiker/hehe.gif';
import './App.css';

const App = () => {
  const [page, setPage] = useState('awal');
  const [isLoading, setIsLoading] = useState(true);
  const [downloadProgress, setDownloadProgress] = useState(0);

  // Daftar semua aset yang wajib di-load sebelum aplikasi terbuka
  const imageAssets = [
    hello,
    happy,
    sad,
    hbd,
    hehe,
    '/foto/01.jpg',
    '/foto/02.jpg',
    '/foto/03.jpg',
    '/foto/04.jpg',
    '/foto/05.jpg'
  ];

  useEffect(() => {
    let loadedCount = 0;

    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loadedCount++;
          // Update persentase loading biar informatif
          setDownloadProgress(Math.round((loadedCount / imageAssets.length) * 100));
          resolve();
        };
        img.onerror = () => {
          // Jika gagal, skip aja biar aplikasi ga stuck selamanya
          loadedCount++;
          resolve();
        };
      });
    };

    // Jalankan preloading untuk semua gambar secara paralel
    Promise.all(imageAssets.map((src) => loadImage(src)))
      .then(() => {
        // Kasih sedikit delay 600ms biar animasinya transisinya smooth pas selesai
        setTimeout(() => {
          setIsLoading(false);
        }, 600);
      });
  }, []);

  // Variasi animasi untuk container/halaman
  const pageVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.25 } }
  };

  // Variasi animasi tombol yang berdenyut (pulse) terus-menerus
  const pulseVariants = {
    animate: {
      scale: [1, 1.06, 1],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    tap: { scale: 0.95 }
  };

  return (
    <div className="bg-[#F8BBD0] min-h-screen w-full flex items-center justify-center selection:bg-[#fb6f92] selection:text-white overflow-x-hidden">
      
      <AnimatePresence mode="wait">
        {/* LAYAR LOADING UTAMA */}
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            className="fixed inset-0 bg-[#F8BBD0] z-50 flex flex-col items-center justify-center gap-4 p-6 text-center"
          >
            {/* Stiker hehe yang berdenyut detak jantung */}
            <motion.img 
              src={hehe} 
              alt="Loading..." 
              className="w-36 h-36 md:w-44 md:h-44 object-contain"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
            />
            
            <div className="space-y-1">
              <h2 className="text-[#510A32] font-bold text-xl tracking-wide">
                Bentar ya bebee, lagi disiapin... 
              </h2>
              {/* Teks persentase progress */}
              <p className="text-[#510A32]/70 font-semibold text-sm">
                {downloadProgress}%
              </p>
            </div>

            {/* Progress Bar Minimalis */}
            <div className="w-48 bg-white/30 h-1.5 rounded-full overflow-hidden shadow-inner">
              <motion.div 
                className="bg-[#fb6f92] h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${downloadProgress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </motion.div>
        ) : (
          
          /* KONTEN APLIKASI UTAMA (Hanya muncul jika selesai loading) */
          <div key="main-content" className="w-full max-w-md mx-auto flex flex-col items-center justify-center text-center p-4 md:p-8">
            <AnimatePresence mode="wait">

              {page === 'awal' && (
                <motion.div
                  key="awal"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex flex-col items-center gap-4 w-full"
                >
                  <img src={hello} alt="Hello" className="w-40 h-40 md:w-52 md:h-52 object-contain" />
                  <h1 className='font-bold text-2xl md:text-3xl text-[#510A32] tracking-wide'>aloo bebee</h1>
                  <div className="flex mt-2">
                    <motion.button
                      variants={pulseVariants}
                      animate="animate"
                      whileTap="tap"
                      onClick={() => setPage('ucapan')}
                      className='bg-[#fb6f92] text-white px-6 py-2.5 text-base md:text-lg font-semibold rounded-3xl shadow-md cursor-pointer'
                    >
                      Klik disiniii
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {page === 'ucapan' && (
                <motion.div
                  key="ucapan"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex flex-col items-center gap-4 w-full"
                >
                  <img src={happy} alt="Happy" className="w-40 h-40 md:w-52 md:h-52 object-contain" />
                  <h1 className='font-bold text-2xl md:text-3xl text-[#510A32] px-2'>kamu siap buat buka iniiii?</h1>
                  <div className="flex flex-row gap-4 mt-2">
                    <motion.button
                      variants={pulseVariants}
                      animate="animate"
                      whileTap="tap"
                      onClick={() => setPage('siap')}
                      className="bg-[#fb6f92] text-white px-6 py-2.5 text-base md:text-lg font-semibold rounded-3xl shadow-md cursor-pointer"
                    >
                      siapppp
                    </motion.button>
                    <motion.button
                      whileHover={{ x: [0, -4, 4, -4, 4, 0], transition: { duration: 0.3 } }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setPage('gsiap')}
                      className="outline outline-[#fb6f92] outline-2 text-[#510A32] px-6 py-2.5 text-base md:text-lg font-semibold rounded-3xl shadow-sm cursor-pointer"
                    >
                      enggaak
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {page === 'gsiap' && (
                <motion.div
                  key="gsiap"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex flex-col items-center gap-4 w-full"
                >
                  <img src={sad} alt="Sad" className="w-40 h-40 md:w-52 md:h-52 object-contain" />
                  <h1 className='font-bold text-2xl md:text-3xl text-[#510A32] px-2'>kamu koo gitu sekarang sama akuu</h1>
                  <div className="flex mt-2">
                    <motion.button
                      variants={pulseVariants}
                      animate="animate"
                      whileTap="tap"
                      onClick={() => setPage('ucapan')}
                      className='bg-[#fb6f92] text-white px-6 py-2.5 text-base md:text-lg font-semibold rounded-3xl shadow-md cursor-pointer'
                    >
                      balikk
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {page === 'siap' && (
                <motion.div
                  key="siap"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex flex-col items-center gap-4 w-full px-2"
                >
                  <img src={hbd} alt="HBD" className="w-44 h-44 md:w-56 md:h-56 object-contain" />
                  <h1 className='font-bold text-xl md:text-2xl text-[#510A32] leading-relaxed'>cieee hari ini cewek cantik ini ulang tahun ke 18! happy birthday my loveee</h1>
                  <p className='text-base md:text-lg text-[#510A32] font-medium opacity-90'>i love you so muchhh cilla alifya!!</p>
                  <div className="flex mt-2">
                    <motion.button
                      variants={pulseVariants}
                      animate="animate"
                      whileTap="tap"
                      onClick={() => setPage('last')}
                      className='bg-[#fb6f92] text-white px-5 py-2.5 text-xs md:text-sm font-semibold rounded-3xl shadow-md cursor-pointer'
                    >
                      aku punya sesuatu lagi buat kamuu
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {page === 'last' && (
                <motion.div
                  key="last"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex flex-col items-center gap-4 w-full px-4"
                >
                  <img src={hehe} alt="hehe" className="w-40 h-40 md:w-52 md:h-52 object-contain" />
                  <h1 className='font-bold text-lg md:text-xl text-[#510A32] leading-relaxed'>okeey terakhir, aku buat sesuatu khusus buat kamu, baca pelan pelan yaa</h1>
                  <div className="flex mt-2">
                    <motion.button
                      variants={pulseVariants}
                      animate="animate"
                      whileTap="tap"
                      onClick={() => setPage('satu')}
                      className='bg-[#fb6f92] text-white px-6 py-2.5 text-xs md:text-sm font-semibold rounded-3xl shadow-md cursor-pointer'
                    >
                      klik iniii
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Bagian Slideshow Foto Teroptimasi Responsif */}
              {['satu', 'dua', 'tiga', 'empat', 'lima'].map((step, index) => {
                const nextPageMap = { satu: 'dua', dua: 'tiga', tiga: 'empat', empat: 'lima', lima: 'akhir' };
                const textMap = {
                  satu: "Ini foto pertama kali kita ketemuu yang selalu aku inget",
                  dua: "aku sangat bersyukur buat setiap momen yang kita bikin sama sama",
                  tiga: "makasih yaa udah jadi bagian dari hidup aku dan buat hari hari aku jadi istimewa",
                  empat: "aku harap kita terus ciptain moment moment indah sama sama yang besar atau yang kecil",
                };

                if (page !== step) return null;

                return (
                  <motion.div
                    key={step}
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="flex flex-col items-center gap-4 w-full px-2"
                  >
                    <div className="bg-white p-3 pb-4 rounded-xl shadow-xl rotate-1 w-64 sm:w-72 md:w-80 transition-all">
                      <img
                        src={`/foto/0${index + 1}.jpg`}
                        alt="Moment"
                        className="object-cover rounded-lg w-full h-56 sm:h-64 md:h-72 shadow-inner"
                      />
                    </div>

                    {step === 'lima' ? (
                      <div className="flex flex-col gap-2 px-2 max-w-sm">
                        <h1 className='font-bold text-xl md:text-2xl text-[#510A32] leading-snug'>kamu berhak buat dapetin seluruh isi dunia dan aku selalu sayang kamu</h1>
                        <p className='text-sm md:text-base text-[#510A32] opacity-90 leading-normal'>kamu ga pernah nyerah sama aku begitupun juga aku, dan karena itu aku selamanya bersyukur, makasih ya udah jadi pacar aku love you more than anything</p>
                      </div>
                    ) : (
                      <h1 className='font-bold text-lg md:text-xl text-[#510A32] px-4 leading-relaxed max-w-sm'>{textMap[step]}</h1>
                    )}

                    <div className="flex pt-2">
                      <motion.button
                        variants={pulseVariants}
                        animate="animate"
                        whileTap="tap"
                        onClick={() => setPage(nextPageMap[step])}
                        className='bg-[#fb6f92] text-white px-8 py-2 text-xs md:text-sm font-bold rounded-3xl shadow-md cursor-pointer'
                      >
                        ^-^
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}

              {page === 'akhir' && (
                <motion.div
                  key="akhir"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  className="flex flex-col items-center gap-6 w-full max-w-md px-4 py-6"
                >
                  <motion.h1
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', damping: 12, stiffness: 100 }}
                    className='font-black text-3xl md:text-4xl text-[#510A32] leading-tight'
                  >
                    Happy Birthday, Sayang! 💖
                  </motion.h1>

                  <div className="text-[#510A32] space-y-4 text-left bg-white/40 backdrop-blur-sm p-5 rounded-2xl shadow-sm border border-white/20">
                    <p className="text-base md:text-lg font-bold text-center">
                      Cieee, selamat ulang tahun yang ke-18, cewek cantiku Cilla Alifya!
                    </p>
                    <p className="text-sm md:text-base leading-relaxed">
                      Hari ini adalah hari yang paling istimewa, bukan cuma buat kamu, tapi juga buat aku yang sangat beruntung bisa ada di samping kamu. Di umur yang baru ini, aku mau kamu tahu kalau aku bener-bener bangga sama semua proses yang udah kamu lewatin. Kamu hebat banget, sayang.
                    </p>
                    <p className="text-sm md:text-base leading-relaxed">
                      Mungkin ke depannya bakal banyak hal baru atau tantangan baru yang bikin kamu bingung atau capek. Tapi, kamu jangan pernah merasa sendirian ya? Aku bakal selalu ada di sini, di barisan paling depan buat semangatin kamu, dengerin keluh kesah kamu, dan peluk kamu pas dunia lagi kerasa berat.
                    </p>
                    <p className="text-sm md:text-base leading-relaxed">
                      Jangan pernah ragu sama kemampuan diri kamu sendiri. Kejar semua impian cita-cita, dan hal-hal yang pengen kamu raih, Aku bakal selalu dukung penuh apapun yang bikin kamu bahagia
                    </p>

                    <div className="pt-2 border-t border-[#510A32]/10 space-y-1.5 text-xs font-medium">
                      <p>🤍 Semoga kamu selalu sehat dan dilindungi kebaikan.</p>
                      <p>🤍 Semoga senyum manis kamu gak pernah hilang.</p>
                      <p>🤍 Semoga kita bisa terus saling jaga sampai tua nanti.</p>
                      <p>🤍 Dan semoga Tuhan selalu memberkati kamu.</p>
                    </div>

                    <p className="text-base md:text-lg font-bold text-center pt-3 tracking-wide">
                      I love you more than words can say bebee! Always and forever 🫶✨
                    </p>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;