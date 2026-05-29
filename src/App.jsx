import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import hello from '/stiker/hello.gif';
import happy from '/stiker/happy.gif';
import sad from '/stiker/sad.gif';
import hbd from '/stiker/hbd.gif';
import hehe from '/stiker/hehe.gif';
import './App.css';

const App = () => {
  const [page, setPage] = useState('awal');

  // Variasi animasi untuk container/halaman
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  // Variasi animasi tombol yang berdenyut (pulse) terus-menerus
  const pulseVariants = {
    animate: {
      scale: [1, 1.08, 1],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    tap: { scale: 0.95 }
  };

  return (
    <div className="bg-[#F8BBD0] min-h-screen overflow-x-hidden">
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-10 text-center">

        {/* AnimatePresence mengizinkan komponen bernavigasi dengan mulus saat unmount */}
        <AnimatePresence mode="wait">

          {page === 'awal' && (
            <motion.div
              key="awal"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col items-center gap-4"
            >
              <img src={hello} alt="Hello" className="object-contain" />
              <h1 className='font-bold text-3xl text-[#510A32]'>aloo bebee</h1>
              <div className="flex">
                <motion.button
                  variants={pulseVariants}
                  animate="animate"
                  whileTap="tap"
                  onClick={() => setPage('ucapan')}
                  className='bg-[#fb6f92] text-white px-6 py-2.5 text-lg font-semibold rounded-3xl shadow-md transition-all cursor-pointer'
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
              className="flex flex-col items-center gap-4"
            >
              <img src={happy} alt="Happy" className="object-contain" />
              <h1 className='font-bold text-3xl text-[#510A32]'>kamu siap buat buka iniiii?</h1>
              <div className="flex flex-row gap-4">
                <motion.button
                  variants={pulseVariants}
                  animate="animate"
                  whileTap="tap"
                  onClick={() => setPage('siap')}
                  className="bg-[#fb6f92] text-white px-6 py-2.5 text-lg font-semibold rounded-3xl shadow-md transition-all cursor-pointer"
                >
                  siapppp
                </motion.button>
                <motion.button
                  whileHover={{ x: [0, -5, 5, -5, 5, 0], transition: { duration: 0.4 } }} // Efek bergetar nolak pas di-hover
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPage('gsiap')}
                  className="outline outline-[#fb6f92] text-[#510A32] px-6 py-2.5 text-lg font-semibold rounded-3xl shadow-md transition-all cursor-pointer"
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
              className="flex flex-col items-center gap-4"
            >
              <img src={sad} alt="Sad" className="object-contain" />
              <h1 className='font-bold text-3xl text-[#510A32]'>kamu koo gitu sekarang sama akuu</h1>
              <div className="flex">
                <motion.button
                  variants={pulseVariants}
                  animate="animate"
                  whileTap="tap"
                  onClick={() => setPage('ucapan')}
                  className='bg-[#fb6f92] text-white px-6 py-2.5 text-lg font-semibold rounded-3xl shadow-md transition-all cursor-pointer'
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
              className="flex flex-col items-center gap-4"
            >
              <img src={hbd} alt="HBD" className="object-contain" />
              <h1 className='font-bold text-xl text-[#510A32] max-w-md'>cieee hari ini cewek cantik ini ulang tahun ke 18! happy birthday my loveee</h1>
              <p className='text-lg text-[#510A32] font-medium'>i love you so muchhh cilla alifya!!</p>
              <div className="flex">
                <motion.button
                  variants={pulseVariants}
                  animate="animate"
                  whileTap="tap"
                  onClick={() => setPage('last')}
                  className='bg-[#fb6f92] text-white px-6 py-2.5 text-sm font-semibold rounded-3xl shadow-md transition-all cursor-pointer'
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
              className="flex flex-col items-center gap-4"
            >
              <img src={hehe} alt="hehe" className="object-contain" />
              <h1 className='font-bold text-xl text-[#510A32] max-w-sm'>okeey terakhir, aku buat sesuatu khusus buat kamu, baca pelan pelan yaa</h1>
              <div className="flex">
                <motion.button
                  variants={pulseVariants}
                  animate="animate"
                  whileTap="tap"
                  onClick={() => setPage('satu')}
                  className='bg-[#fb6f92] text-white px-6 py-2.5 text-sm font-semibold rounded-3xl shadow-md transition-all cursor-pointer'
                >
                  klik iniii
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Bagian Slideshow Foto (1 - 5) */}
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
                className="flex flex-col items-center gap-4 max-w-md"
              >
                {/* Frame Foto agar rapi */}
                <div className="bg-white p-3 rounded-2xl shadow-xl rotate-1 max-w-[280px]">
                  <img src={`/foto/0${index + 1}.jpg`} alt="Moment" className="object-cover rounded-xl w-full h-80" />
                </div>

                {step === 'lima' ? (
                  <>
                    <h1 className='font-bold text-2xl text-[#510A32]'>kamu berhak buat dapetin seluruh isi dunia dan aku selalu sayang kamu</h1>
                    <p className='text-md text-[#510A32] px-4'>kamu ga pernah nyerah sama aku begitupun juga aku, dan karena itu aku selamanya bersyukur, makasih ya udah jadi pacar aku love you more than anything</p>
                  </>
                ) : (
                  <h1 className='font-bold text-xl text-[#510A32] px-4'>{textMap[step]}</h1>
                )}

                <div className="flex pt-2">
                  <motion.button
                    variants={pulseVariants}
                    animate="animate"
                    whileTap="tap"
                    onClick={() => setPage(nextPageMap[step])}
                    className='bg-[#fb6f92] text-white px-8 py-2 text-sm font-bold rounded-3xl shadow-md transition-all cursor-pointer'
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
              {/* Judul Utama dengan Animasi Spring */}
              <motion.h1
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 12, stiffness: 100 }}
                className='font-black text-3xl md:text-4xl text-[#510A32] leading-tight'
              >
                Happy Birthday, Sayang! 💖
              </motion.h1>

              {/* Blok Teks Romantis & Supportif */}
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

                {/* Bagian Doa/Harapan Kecil */}
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
    </div>
  );
};

export default App;