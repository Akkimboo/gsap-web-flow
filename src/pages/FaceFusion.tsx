import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Layout from '../components/Layout';
import BeforeAfterComparison from '../components/BeforeAfterComparison';
import GoogleSignIn from '../components/GoogleSignIn';
import { Upload } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { useToast } from '../hooks/use-toast';

gsap.registerPlugin(ScrollTrigger);

const FaceFusion = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSignInDialog, setShowSignInDialog] = useState(false);
  const [promptError, setPromptError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const promptContainerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Page entrance animation
      gsap.fromTo('.page-section', {
        opacity: 0,
        y: 50
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      });

      // Scroll-triggered animations for other sections (excluding image generation section)
      gsap.utils.toArray('.animate-on-scroll:not(.no-gsap)').forEach((element: any) => {
        gsap.fromTo(element, {
          opacity: 0,
          y: 50,
          scale: 0.95
        }, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        });
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setImageError(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const shakeContainer = (containerRef: React.RefObject<HTMLDivElement>) => {
    if (containerRef.current) {
      gsap.to(containerRef.current, { 
        x: -10, 
        duration: 0.1, 
        yoyo: true, 
        repeat: 3, 
        ease: "power2.out" 
      });
    }
  };

  const generateImage = () => {
    let hasError = false;

    // Check for image
    if (!uploadedImage) {
      setImageError(true);
      shakeContainer(imageContainerRef);
      toast({
        variant: "destructive",
        title: "Image Required",
        description: "Please upload an image to continue."
      });
      hasError = true;
    }

    // Check for prompt
    if (!prompt.trim()) {
      setPromptError(true);
      shakeContainer(promptContainerRef);
      toast({
        variant: "destructive", 
        title: "Prompt Required",
        description: "Please describe your vision to continue."
      });
      hasError = true;
    }

    if (hasError) {
      // Clear errors after 3 seconds
      setTimeout(() => {
        setPromptError(false);
        setImageError(false);
      }, 3000);
      return;
    }

    // Check if user is signed in
    if (!user) {
      setShowSignInDialog(true);
      return;
    }

    setIsGenerating(true);
    
    // Simulate generation process
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Image Generated!",
        description: "Your AI masterpiece is ready."
      });
    }, 3000);
  };

  const handleSignInSuccess = () => {
    setShowSignInDialog(false);
    // Automatically start generation after sign-in
    if (uploadedImage && prompt) {
      generateImage();
    }
  };

  return (
    <Layout>
      <div ref={pageRef} className="p-4 md:p-8 space-y-12">
        {/* Image Generation Section - No GSAP effects */}
        <section className="page-section bg-gray-900 rounded-xl p-8 no-gsap">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column: Inputs */}
              <div className="space-y-6">
                {/* Upload Box */}
                <div ref={imageContainerRef}>
                  <label className="block text-white text-lg font-medium mb-3">
                    Upload an Image
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="imageUpload"
                    />
                    <label
                      htmlFor="imageUpload"
                      className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-800 transition-colors ${
                        imageError ? 'border-red-500 bg-red-500/10' : 'border-purple-500'
                      }`}
                    >
                      {uploadedImage ? (
                        <img
                          src={uploadedImage}
                          alt="Uploaded"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <>
                          <Upload className={`mb-2 ${imageError ? 'text-red-400' : 'text-purple-400'}`} size={32} />
                          <span className={`${imageError ? 'text-red-300' : 'text-gray-300'}`}>
                            {imageError ? 'Please upload an image' : 'Click to upload image'}
                          </span>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                {/* Prompt Box */}
                <div ref={promptContainerRef}>
                  <label className="block text-white text-lg font-medium mb-3">
                    Describe Your Vision
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => {
                      setPrompt(e.target.value);
                      setPromptError(false);
                    }}
                    placeholder="e.g., A cyberpunk samurai in a neon city"
                    rows={4}
                    className={`w-full p-4 bg-gray-800 border-2 rounded-lg text-white placeholder-gray-400 focus:outline-none resize-none transition-colors ${
                      promptError 
                        ? 'border-red-500 focus:border-red-400 bg-red-500/10' 
                        : 'border-purple-500 focus:border-purple-400'
                    }`}
                  />
                  {promptError && (
                    <p className="text-red-400 text-sm mt-2">Please describe your vision to continue</p>
                  )}
                </div>

                {/* Generate Button */}
                <button
                  onClick={generateImage}
                  disabled={isGenerating}
                  className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white py-4 rounded-lg font-medium text-lg transition-colors"
                >
                  {isGenerating ? 'Generating...' : 'Generate Image'}
                </button>
              </div>

              {/* Right Column: Preview */}
              <div>
                <div className="w-full h-96 bg-gray-800 border-2 border-purple-500 rounded-lg flex items-center justify-center">
                  {isGenerating ? (
                    <div className="text-center">
                      <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                      <span className="text-gray-300">Generating your masterpiece...</span>
                    </div>
                  ) : (
                    <span className="text-gray-500 text-center px-8">
                      Your generated image will appear here
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sign In Dialog */}
        <Dialog open={showSignInDialog} onOpenChange={setShowSignInDialog}>
          <DialogContent className="bg-gray-900 border-purple-600">
            <DialogHeader>
              <DialogTitle className="text-white text-center">Sign In Required</DialogTitle>
            </DialogHeader>
            <div className="text-center text-gray-300 mb-4">
              Please sign in to generate images
            </div>
            <GoogleSignIn />
          </DialogContent>
        </Dialog>

        {/* Introduction */}
        <div className="page-section max-w-4xl mx-auto text-center animate-on-scroll">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Rewrite Realities</h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            What if your selfie became a vampire lord atop a glowing skyscraper? With DPIcon's Image to Image Face Swap,
            it's not "what if"—it's "watch this." Upload a photo, toss in a prompt, and our AI plucks your face, planting
            it into a whole new universe. Buckle up for a wild ride!
          </p>
        </div>

        {/* Image Comparison Section */}
        <div className="page-section bg-gray-900 rounded-xl p-8 md:p-16 animate-on-scroll">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <BeforeAfterComparison />
            </div>
            <div className="space-y-6">
              <div className="text-xl text-gray-300">
                Fast & Free: Get your transparent images in just seconds without any cost.
              </div>
              <ul className="space-y-4 text-gray-300">
                <li>
                  <strong className="text-white">No Signup Needed:</strong>
                  <span> Start editing right away without creating an account.</span>
                </li>
                <li>
                  <strong className="text-white">High-Quality Results:</strong>
                  <span> Download high-resolution images perfect for social media, websites, or e-commerce.</span>
                </li>
                <li>
                  <strong className="text-white">User-Friendly Interface:</strong>
                  <span> Simple drag-and-drop functionality for seamless image editing.</span>
                </li>
                <li>
                  <strong className="text-white">Unlimited Usage:</strong>
                  <span> No restrictions on the number of images you can process.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Showcase Image */}
        <div className="page-section max-w-4xl mx-auto animate-on-scroll">
          <div className="aspect-video bg-gradient-to-r from-purple-900 to-purple-700 rounded-xl"></div>
        </div>

        {/* Features Sections */}
        <div className="page-section max-w-4xl mx-auto space-y-12 animate-on-scroll">
          <div>
            <h2 className="text-3xl font-bold mb-6">How to Warp Reality</h2>
            <div className="text-gray-300 text-lg leading-relaxed space-y-2">
              <div><strong>Drop Your Mug:</strong> Pick a photo—your face, your cat's, whatever sparks joy.</div>
              <div><strong>Dream Big:</strong> Prompt us—"a cyberpunk samurai" or "a mermaid in space."</div>
              <div><strong>Behold the Mashup:</strong> Our AI fuses your face into a stunning new scene.</div>
              <div><strong>Claim Your Glory:</strong> Download and flaunt your interdimensional doppelgänger.</div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">Why DPIcon's Face Swap is a Game-Changer</h2>
            <div className="text-gray-300 text-lg leading-relaxed space-y-2">
              <div><strong>Freaky Precision:</strong> Faces fit like they were born there—zero awkward vibes.</div>
              <div><strong>Epic Adventures:</strong> From medieval quests to alien discos, you name it.</div>
              <div><strong>SEO Stardust:</strong> Unique images to rocket your content to the top.</div>
              <div><strong>Foolproof Fun:</strong> So easy, even your grandma could swap into a ninja.</div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">What Sets Us Apart</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              AI Sorcery: Advanced algorithms that turn imagination into masterpieces. No Limits, Just Magic: From text to
              art, face to fantasy – explore it all. Instant Alchemy: Conjure creations faster than a lightning strike. Yours
              to Command: Simple tools, extraordinary results – no wizardry degree required.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FaceFusion;
