
import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const ImageManagement = () => {
  const handleUploadImages = () => {
    toast({
      title: "🚧 Este recurso ainda não está implementado!",
      description: "Mas não se preocupe! Você pode solicitá-lo no seu próximo prompt! 🚀",
    });
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl">
          <Image className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Gerenciamento de Imagens</h2>
      </div>

      <p className="text-gray-400 mb-6">
        Faça upload de múltiplas imagens para cada produto, criando galerias completas.
      </p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-700/30 border-2 border-dashed border-orange-500/50 rounded-2xl p-12 text-center hover:border-orange-500 transition-all"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="p-6 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-full">
            <Upload className="w-12 h-12 text-orange-400" />
          </div>
          <h3 className="text-xl font-semibold text-white">Upload de Imagens</h3>
          <p className="text-gray-400 max-w-md">
            Arraste e solte suas imagens aqui ou clique no botão abaixo para selecionar arquivos
          </p>
          <Button
            onClick={handleUploadImages}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white mt-4"
          >
            <Upload className="w-4 h-4 mr-2" />
            Selecionar Imagens
          </Button>
        </div>
      </motion.div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="aspect-square bg-slate-700/50 rounded-xl border border-slate-600 flex items-center justify-center"
        >
          <Image className="w-8 h-8 text-gray-500" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="aspect-square bg-slate-700/50 rounded-xl border border-slate-600 flex items-center justify-center"
        >
          <Image className="w-8 h-8 text-gray-500" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="aspect-square bg-slate-700/50 rounded-xl border border-slate-600 flex items-center justify-center"
        >
          <Image className="w-8 h-8 text-gray-500" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="aspect-square bg-slate-700/50 rounded-xl border border-slate-600 flex items-center justify-center"
        >
          <Image className="w-8 h-8 text-gray-500" />
        </motion.div>
      </div>
    </div>
  );
};

export default ImageManagement;
  