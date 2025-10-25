import { Button } from "@/components/ui/button";
import { MapPin, Bluetooth, Shield } from "lucide-react";

const Hero = () => {
  const scrollToDashboard = () => {
    document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary-glow to-accent px-6 py-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-glow rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm animate-fade-in">
          <Bluetooth className="w-4 h-4" />
          <span>Bluetooth Low Energy Tracking</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Never Lose Your
          <span className="block bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            Belongings Again
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Track your ID cards, keys, and wallets across campus with precision Bluetooth technology
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Button 
            size="lg" 
            onClick={scrollToDashboard}
            className="bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all text-lg px-8 py-6"
          >
            View Dashboard
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm text-lg px-8 py-6"
          >
            Learn More
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex flex-col items-center gap-3 text-white">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg">Real-Time Location</h3>
            <p className="text-white/80 text-sm">Track items anywhere on campus</p>
          </div>
          <div className="flex flex-col items-center gap-3 text-white">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Bluetooth className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg">Low Energy</h3>
            <p className="text-white/80 text-sm">Long battery life with BLE</p>
          </div>
          <div className="flex flex-col items-center gap-3 text-white">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg">Secure & Private</h3>
            <p className="text-white/80 text-sm">Your data stays protected</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
