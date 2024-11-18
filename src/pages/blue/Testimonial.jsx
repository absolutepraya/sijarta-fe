import React, { useState, useEffect } from 'react';
import { Star, MessageCircle, Clock, Award, Users, ThumbsUp } from 'lucide-react';
import { Card, CardContent, Button } from '../../components/CustomerComponents';
import { motion } from 'framer-motion';

export default function Testimonial() {
  const [selectedService, setSelectedService] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const services = [
    { id: 1, name: 'Premium Cleaning Service', price: 'Rp 150.000', duration: '2 hours', rating: 4.8 },
    { id: 2, name: 'Deep Cleaning Service', price: 'Rp 250.000', duration: '4 hours', rating: 4.9 },
  ];

  const workers = [
    { id: 1, name: 'Ahmad', rating: 4.8, jobs: 156 },
    { id: 2, name: 'Budi', rating: 4.9, jobs: 230 },
    { id: 3, name: 'Charlie', rating: 4.7, jobs: 189 },
    { id: 4, name: 'Diana', rating: 4.9, jobs: 201 },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'John Doe',
      date: '15 Nov 2024',
      text: 'Pelayanan sangat memuaskan! Pekerja sangat profesional dan hasil bersih maksimal.',
      worker: 'Ahmad',
      rating: 5,
      likes: 24,
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const serviceVariants = {
    hover: { scale: 1.02, transition: { duration: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Sticky Header */}
      <div className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : ''
      }`}>
        <div className="max-w-4xl mx-auto p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="p-4 bg-white/90 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-sm text-gray-600">Nama Subkategori</h2>
              <p className="font-medium text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Premium Cleaning
              </p>
            </div>
            <div className="p-4 bg-white/90 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-sm text-gray-600">Kategori</h2>
              <p className="font-medium text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                House Service
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Description */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Card className="overflow-hidden bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Tentang Layanan
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Layanan pembersihan rumah profesional dengan peralatan modern dan ramah lingkungan. 
                Kami menggunakan teknologi terkini dan produk pembersih premium untuk hasil maksimal.
              </p>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <Award className="w-5 h-5 text-blue-500" />
                  <span>Tersertifikasi</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-5 h-5 text-purple-500" />
                  <span>Tim Profesional</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <ThumbsUp className="w-5 h-5 text-pink-500" />
                  <span>Garansi 100%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Service Sessions */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Pilihan Sesi Layanan
          </h2>
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={serviceVariants}
              whileHover="hover"
              className="group relative overflow-hidden bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{service.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{service.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {service.price}
                    </p>
                    <Button 
                      onClick={() => setSelectedService(service.id)}
                      className="mt-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Pesan Sekarang
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Workers */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Tim Profesional Kami
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {workers.map((worker) => (
              <motion.div
                key={worker.id}
                whileHover={{ y: -5 }}
                className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-1">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <span className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {worker.name[0]}
                    </span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-lg mb-2">{worker.name}</p>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{worker.rating}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{worker.jobs} jobs</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Testimoni Pelanggan
          </h2>
          <div className="space-y-6">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-semibold text-lg">{testimonial.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{testimonial.date}</p>
                  </div>
                  <p className="text-gray-700 mb-4">{testimonial.text}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <p className="text-gray-600">Pekerja: <span className="font-medium">{testimonial.worker}</span></p>
                      <div className="flex items-center gap-1 text-gray-600">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{testimonial.likes}</span>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="flex items-center gap-1 hover:bg-blue-50 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Balas
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}