'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // 追加
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Camera, Send, ArrowUp } from 'lucide-react';

const TextGenerator = () => {
  const [input, setInput] = useState('');
  const [image, setImage] = useState(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 }); // 追加
  const [generatedText, setGeneratedText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleInputChange = (e) => setInput(e.target.value);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      const img = new Image();
      img.onload = () => {
        setImageDimensions({ width: img.width, height: img.height });
      };
      img.src = URL.createObjectURL(file);

      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedText(`${input}の写真と一緒に、楽しい1日を過ごしました！今日も素敵な思い出ができて幸せです♪ みんなも素敵な1日を過ごせますように☆`);
      setIsGenerating(false);
    }, 2000);
  };

  const handleScroll = () => {
    setShowScrollTop(window.pageYOffset > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Zen+Maru+Gothic:wght@400;500;700&display=swap');

        @keyframes neon {
          from {
            text-shadow: 
              0 0 5px #ff00de,
              0 0 10px #ff00de,
              0 0 15px #ff00de,
              0 0 20px #ff00de,
              0 0 35px #ff00de,
              0 0 40px #ff00de,
              0 0 50px #ff00de,
              0 0 75px #ff00de;
          }
          to {
            text-shadow: 
              0 0 10px #ff00de,
              0 0 20px #ff00de,
              0 0 30px #ff00de,
              0 0 40px #ff00de,
              0 0 70px #ff00de,
              0 0 80px #ff00de,
              0 0 100px #ff00de,
              0 0 150px #ff00de;
          }
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-black bg-opacity-30 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-6 sm:p-8 lg:p-10">
            <header className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 text-center" style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}>
                写メ日記自動生成ツール
              </h1>
              <h2 className="text-3xl sm:text-4xl font-bold mb-1 text-center" style={{
                fontFamily: "'Press Start 2P', cursive",
                color: '#ffffff',
                textShadow: `
                  0 0 5px #ff00de,
                  0 0 10px #ff00de,
                  0 0 15px #ff00de,
                  0 0 20px #ff00de,
                  0 0 35px #ff00de,
                  0 0 40px #ff00de,
                  0 0 50px #ff00de,
                  0 0 75px #ff00de
                `,
                animation: 'neon 1.5s ease-in-out infinite alternate'
              }}>
                覚醒つづるくん
              </h2>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-white bg-opacity-10 rounded-2xl p-4">
                  <h3 className="font-bold text-pink-300 mb-2 text-lg" style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}>つづるくんの使い方</h3>
                  <ol className="list-decimal list-inside text-white space-y-1 text-base" style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}>
                    <li>今日のキーワードを入力してね</li>
                    <li>写メも選んでアップロードしてね</li>
                    <li>「日記を書く」ボタンを押すと魔法が起きるよ！</li>
                  </ol>
                </div>

                <div className="bg-white bg-opacity-10 rounded-2xl p-4">
                  <Textarea
                    placeholder="今日のキーワードを入力してね（例：カフェ、友達、海）"
                    value={input}
                    onChange={handleInputChange}
                    className="w-full mb-4 bg-transparent text-white border-pink-500 focus:border-pink-300 focus:ring-pink-300 resize-none text-base rounded-xl"
                    rows={3}
                    style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
                  />
                  <div className="flex justify-between items-center">
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer inline-flex items-center justify-center bg-pink-600 hover:bg-pink-500 text-white rounded-full w-12 h-12 transition-colors duration-300 touch-manipulation">
                        <Camera className="h-6 w-6" />
                      </label>
                    </div>
                    <Button
                      onClick={handleGenerate}
                      className="bg-pink-600 hover:bg-pink-500 text-white rounded-full px-6 py-3 transition-all duration-300 text-base touch-manipulation"
                      style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
                      disabled={isGenerating}
                    >
                      {isGenerating ? '魔法をかけています...' : '日記を書く'}
                      {isGenerating ? <span className="ml-2 animate-spin">🌟</span> : <Send className="ml-2 h-4 w-4 inline" />}
                    </Button>
                  </div>
                </div>

                {image && (
                  <div className="bg-white bg-opacity-10 rounded-2xl p-4">
                    <Image
                      src={image}
                      alt="アップロードされた写メ"
                      width={imageDimensions.width}
                      height={imageDimensions.height}
                      className="w-full h-auto rounded-xl"
                    />
                  </div>
                )}
              </div>

              <div className="bg-white bg-opacity-10 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-pink-300 text-center" style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}>
                  つづるくんが書いた日記
                </h3>
                <div className="bg-pink-900 bg-opacity-30 p-4 rounded-xl min-h-[200px] flex items-center justify-center">
                  {generatedText ? (
                    <p className="text-white text-center text-base" style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}>{generatedText}</p>
                  ) : (
                    <p className="text-gray-400 text-center text-base" style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}>
                      ここにつづるくんが書いた日記が表示されるよ♪
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-pink-600 text-white rounded-full p-3 shadow-lg hover:bg-pink-500 transition-colors duration-300"
        >
          <ArrowUp />
        </button>
      )}
    </>
  );
};

export default TextGenerator;
