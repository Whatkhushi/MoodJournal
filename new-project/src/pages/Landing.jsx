import React, { useState, useEffect } from 'react';
import { 
  PlusCircle, BarChart3, BookOpen, HeartHandshake, Target, Smile, 
  ChevronDown, Play, Mail, Heart, Shield, Bell, Eye, 
  ArrowRight, Check, Star, MessageCircle, User, Calendar,
  Instagram, Twitter, Facebook, Github
} from 'lucide-react';

const Landing = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [email, setEmail] = useState('');
  const [isVisible, setIsVisible] = useState({});

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const testimonials = [
    { name: "Sarah Chen", age: 28, text: "MindLog helped me understand my emotional patterns like never before! The insights are incredible.", avatar: "👩‍💼" },
    { name: "Alex Rodriguez", age: 24, text: "Finally, a journaling app that doesn't feel overwhelming. I love the mood tracking feature!", avatar: "👨‍🎓" },
    { name: "Maya Patel", age: 31, text: "The analytics dashboard is beautiful and actually useful. I can see my progress over time.", avatar: "👩‍🔬" }
  ];

  const moods = [
    { emoji: "😊", label: "Happy", color: "bg-yellow-100 hover:bg-yellow-200" },
    { emoji: "😔", label: "Sad", color: "bg-blue-100 hover:bg-blue-200" },
    { emoji: "😌", label: "Calm", color: "bg-green-100 hover:bg-green-200" },
    { emoji: "😰", label: "Anxious", color: "bg-red-100 hover:bg-red-200" },
    { emoji: "😴", label: "Tired", color: "bg-purple-100 hover:bg-purple-200" },
    { emoji: "🤔", label: "Thoughtful", color: "bg-indigo-100 hover:bg-indigo-200" },
    { emoji: "😡", label: "Angry", color: "bg-orange-100 hover:bg-orange-200" },
    { emoji: "🥰", label: "Loved", color: "bg-pink-100 hover:bg-pink-200" }
  ];

  const timelineSteps = [
    { title: "Start Your Journey", desc: "Create your account and set up your personal mood tracking space", icon: <User className="text-purple-500" size={32} /> },
    { title: "Daily Check-ins", desc: "Quick 30-second mood entries that fit seamlessly into your routine", icon: <Calendar className="text-blue-500" size={32} /> },
    { title: "Discover Patterns", desc: "Uncover emotional trends and triggers through beautiful visualizations", icon: <BarChart3 className="text-green-500" size={32} /> },
    { title: "Grow & Reflect", desc: "Use insights to make positive changes and celebrate your progress", icon: <Target className="text-pink-500" size={32} /> }
  ];

  const features = [
    { icon: <PlusCircle size={40} />, title: 'Quick Journaling', desc: 'Capture your moods and thoughts in seconds with our intuitive interface.' },
    { icon: <BarChart3 size={40} />, title: 'Mood Analytics', desc: 'Beautiful charts and insights that reveal your emotional patterns over time.' },
    { icon: <BookOpen size={40} />, title: 'Reflect & Grow', desc: 'Look back on your journey, celebrate progress, and set meaningful goals.' }
  ];

  const benefits = [
    "Simple, intuitive mood tracking interface",
    "Personalized emotional insights and patterns",
    "Beautiful visual analytics dashboard",
    "Smart reminders to build consistent habits",
    "Fully private and secure - your data stays yours",
    "Minimal, calming design for peaceful journaling"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 ">
      
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-8 -left-8 w-96 h-96 bg-gradient-to-tr from-purple-400 to-indigo-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full opacity-10 animate-spin" style={{animationDuration: '20s'}}></div>
        </div>

        <div className="text-center max-w-5xl px-4 z-10">
          <div className="mb-8 animate-bounce">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-4">
              <Heart className="text-white" size={40} />
            </div>
          </div>
          
          <h1 className="text-7xl md:text-8xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 animate-pulse leading-[1.3]">
            MindLog
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-4 font-light">
            Your Personal Emotional Journey
          </p>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
            Track your moods, discover patterns, and nurture your emotional well-being with the most beautiful journaling experience ever created.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
           <br/>
           
           
       <p className="text-center text-3xl font-semibold text-white tracking-wider leading-relaxed">
  <span className="relative inline-block after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-pink-500 after:to-purple-500 after:transition-all after:duration-700 hover:after:w-full cursor-default">
    Pause.
  </span>{' '}
  <span className="relative inline-block after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-pink-500 after:to-purple-500 after:transition-all after:duration-700 hover:after:w-full cursor-default">
    Breathe.
  </span>{' '}
  <span className="relative inline-block text-purple-400 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-pink-500 after:to-purple-500 after:transition-all after:duration-700 hover:after:w-full cursor-default">
    Feel.
  </span>{' '}
  <span className="relative inline-block after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-pink-500 after:to-purple-500 after:transition-all after:duration-700 hover:after:w-full cursor-default">
    Reflect.
  </span>{' '}
  <span className="relative inline-block after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-pink-500 after:to-purple-500 after:transition-all after:duration-700 hover:after:w-full cursor-default">
    Grow.
  </span>
</p>


            {/* <button className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-300 flex items-center justify-center gap-2">
              Get Started Free <ArrowRight size={20} />
            </button>
            <button className="bg-white/80 backdrop-blur-sm text-gray-800 px-10 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 flex items-center justify-center gap-2 border border-gray-200">
              <Play size={20} /> Watch Demo
            </button> */}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 animate-bounce">
          <ChevronDown className="text-gray-400" size={32} />
        </div>
      </div>





<br/>
<br/>
<br/>
      {/* Key Features Section */}
      <div id="features" data-animate className={`py-20 px-4 transition-all duration-1000 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 leading-[1.5]">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Powerful features designed to make emotional tracking effortless and insightful
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-gray-100 dark:border-gray-700">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:rotate-12 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Timeline */}
      <div id="timeline" data-animate className={`py-20 px-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 transition-all duration-1000 ${isVisible.timeline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 leading-[1.5]">
              Your Emotional Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Every step designed to help you grow
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-300 to-pink-300 rounded-full"></div>
            
            {timelineSteps.map((step, index) => (
              <div key={index} className={`flex items-center mb-16 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                  <div className="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">{step.desc}</p>
                  </div>
                </div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full shadow-xl flex items-center justify-center border-4 border-purple-200 dark:border-purple-700 hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                </div>
                
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mood Gallery */}
      <div id="moods" data-animate className={`py-20 px-4 transition-all duration-1000 ${isVisible.moods ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4 leading-[1.5]">
            How Are You Feeling?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
            Express your emotions with our beautiful mood tracking
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {moods.map((mood, index) => (
              <div key={index} className={`${mood.color} rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-600`}>
                <div className="text-4xl mb-3">{mood.emoji}</div>
                <div className="font-semibold text-gray-700 dark:text-gray-300">{mood.label}</div>
              </div>
            ))}
          </div>

          <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Try it now!</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Click on any mood above to see how easy tracking can be</p>
            <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-300">
              Start Tracking
            </button>
          </div>
        </div>
      </div>

      {/* Why MindLog Section */}
      <div className="py-20 px-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">Why Choose MindLog?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
            Built with love for your emotional well-being
          </p>

          <div className="grid md:grid-cols-2 gap-6 text-left">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="text-white" size={18} />
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-lg">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* App Demo Preview */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 leading-[1.5]">
            See MindLog in Action
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
            Beautiful, intuitive design that makes journaling a joy
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {["Mood Entry", "Analytics Dashboard", "Daily Journal"].map((screen, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 group">
                <div className="bg-gradient-to-br from-pink-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl h-48 mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <div className="text-6xl opacity-50">📱</div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{screen}</h3>
                <p className="text-gray-600 dark:text-gray-300">Beautiful and functional design</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 px-4 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-12 leading-[1.5]">
            What People Say
          </h2>

          <div className="relative">
            <div className="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-3xl p-12 shadow-2xl border border-gray-100 dark:border-gray-700">
              <div className="text-6xl mb-6">{testimonials[currentTestimonial].avatar}</div>
              <blockquote className="text-2xl text-gray-700 dark:text-gray-300 mb-6 italic">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
              <div className="font-bold text-lg text-gray-800 dark:text-white">
                {testimonials[currentTestimonial].name}, {testimonials[currentTestimonial].age}
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Email Subscription */}
      <div className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-white shadow-2xl">
            <Mail className="mx-auto mb-6" size={48} />
            <h2 className="text-4xl font-bold mb-4">Stay Mindful</h2>
            <p className="text-xl opacity-90 mb-8">
              Get weekly tips, emotional insights, and mindfulness resources delivered to your inbox
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-white/30"
              />
              <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6 leading-[1.3]">
            Ready to Begin?
          </h2>
          <p className="text-2xl text-gray-600 dark:text-gray-400 mb-12">
            Start your mindful journey today. It's free, beautiful, and life-changing.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-12 py-5 rounded-full font-bold text-xl shadow-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-300">
              Get Started For Free
            </button>
            <button className="bg-white/80 backdrop-blur-sm text-gray-800 px-12 py-5 rounded-full font-semibold text-xl shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 border border-gray-200">
              Learn More
            </button>
          </div>
        </div>
      </div>

      
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="text-pink-500" size={24} />
                <span className="text-2xl font-bold">MindLog</span>
              </div>
              <p className="text-gray-400">
                Your personal space for emotional growth and mindful reflection.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Connect</h3>
              <div className="flex gap-4">
                <Twitter className="text-gray-400 hover:text-white cursor-pointer transition-colors" size={24} />
                <Instagram className="text-gray-400 hover:text-white cursor-pointer transition-colors" size={24} />
                <Facebook className="text-gray-400 hover:text-white cursor-pointer transition-colors" size={24} />
                <Github className="text-gray-400 hover:text-white cursor-pointer transition-colors" size={24} />
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>Made with ❤️ for your emotional well-being • © 2025 MindLog</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;