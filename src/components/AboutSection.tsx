import Icon from "@/components/ui/icon";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const AboutSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  
  return (
    <section ref={ref} id="about" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoNTksIDEzMCwgMjQ2LCAwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full filter blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full filter blur-[120px] animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full filter blur-[150px] animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="max-w-[1460px] mx-auto relative z-10">
        <h2 className={`font-heading font-bold text-4xl md:text-5xl text-center mb-4 text-white ${isVisible ? 'animate-scroll-in' : 'opacity-0'}`}>
          О сервисе
        </h2>
        <div className={`text-center mb-16 ${isVisible ? 'animate-scroll-in-delay-1' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-400/30 text-blue-300 px-6 py-3 rounded-full font-semibold text-sm md:text-base">
            <Icon name="Sparkles" size={20} className="text-cyan-400" />
            <span>Битрикс24 + ИИ Copilot = Новая эра автоматизации</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`space-y-8 ${isVisible ? 'animate-scroll-in-delay-2' : 'opacity-0'}`}>
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                Битрикс24 — это комплексная CRM-система нового поколения, которая объединяет все
                инструменты для успешного ведения бизнеса в одном месте.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Теперь с мощной <span className="text-cyan-400 font-semibold">интеграцией ИИ Copilot</span>, который помогает вашей команде работать быстрее, умнее и эффективнее.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-sm border border-blue-400/20 rounded-2xl p-6 hover:bg-white/10 transition-all group">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon name="Brain" size={24} className="text-white" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">ИИ-помощник</h3>
                <p className="text-gray-400 text-sm">Copilot анализирует данные и подсказывает решения</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-purple-400/20 rounded-2xl p-6 hover:bg-white/10 transition-all group">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon name="Users" size={24} className="text-white" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Командная работа</h3>
                <p className="text-gray-400 text-sm">Синхронизация задач в реальном времени</p>
              </div>
            </div>
          </div>

          <div className={`relative ${isVisible ? 'animate-scroll-in-delay-3' : 'opacity-0'}`}>
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-400/30 rounded-3xl p-8 md:p-12">
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-cyan-500/30 rounded-full filter blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-500/30 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
              
              <div className="relative z-10 space-y-8">
                <div className="flex items-center justify-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/50">
                    <Icon name="Bot" size={40} className="text-white" />
                  </div>
                  <div className="text-4xl font-bold text-white">+</div>
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/50">
                    <Icon name="Building2" size={40} className="text-white" />
                  </div>
                </div>

                <div className="text-center space-y-4">
                  <h3 className="text-3xl font-heading font-bold text-white">
                    15,000,000+
                  </h3>
                  <p className="text-gray-300 text-lg">
                    компаний доверяют Битрикс24
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400 mb-1">99.9%</div>
                    <div className="text-xs text-gray-400">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-1">24/7</div>
                    <div className="text-xs text-gray-400">Поддержка</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400 mb-1">200+</div>
                    <div className="text-xs text-gray-400">Стран</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`mt-16 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-400/30 rounded-3xl p-8 md:p-12 ${isVisible ? 'animate-scroll-in-delay-3' : 'opacity-0'}`}>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-green-500/30">
                <Icon name="TrendingUp" size={32} className="text-white" />
              </div>
              <h4 className="text-white font-bold text-xl">+30% к продажам</h4>
              <p className="text-gray-400 text-sm">в среднем после внедрения</p>
            </div>
            <div className="space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-orange-500/30">
                <Icon name="Zap" size={32} className="text-white" />
              </div>
              <h4 className="text-white font-bold text-xl">-60% рутины</h4>
              <p className="text-gray-400 text-sm">благодаря автоматизации</p>
            </div>
            <div className="space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-blue-500/30">
                <Icon name="Rocket" size={32} className="text-white" />
              </div>
              <h4 className="text-white font-bold text-xl">5x быстрее</h4>
              <p className="text-gray-400 text-sm">обработка заявок с ИИ</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;