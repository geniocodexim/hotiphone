
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Upload, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const BulkUpload = () => {
  const handleUploadFile = () => {
    toast({
      title: "🚧 Este recurso ainda não está implementado!",
      description: "Mas não se preocupe! Você pode solicitá-lo no seu próximo prompt! 🚀",
    });
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl">
          <Users className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Upload em Massa</h2>
      </div>

      <p className="text-gray-400 mb-6">
        Importe ofertas e SKUs de fornecedores via planilhas.
      </p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-700/30 border-2 border-dashed border-orange-500/50 rounded-2xl p-12 text-center hover:border-orange-500 transition-all"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="p-6 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-full">
            <FileSpreadsheet className="w-12 h-12 text-orange-400" />
          </div>
          <h3 className="text-xl font-semibold text-white">Upload de Planilha</h3>
          <p className="text-gray-400 max-w-md">
            Arraste e solte sua planilha aqui ou clique no botão abaixo para selecionar o arquivo
          </p>
          <div className="flex gap-3 mt-4">
            <Button
              onClick={handleUploadFile}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
            >
              <Upload className="w-4 h-4 mr-2" />
              Selecionar Arquivo
            </Button>
            <Button
              onClick={() => {
                toast({
                  title: "📥 Download do Template",
                  description: "Baixe o modelo de planilha para importação em massa.",
                });
              }}
              variant="outline"
              className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10"
            >
              Baixar Template
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="mt-8 bg-slate-700/50 rounded-xl p-6 border border-slate-600">
        <h3 className="text-lg font-semibold text-white mb-4">Formatos Suportados</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-4 bg-slate-600/30 rounded-lg">
            <FileSpreadsheet className="w-5 h-5 text-green-400" />
            <span className="text-gray-300">.xlsx (Excel)</span>
          </div>
          <div className="flex items-center gap-3 p-4 bg-slate-600/30 rounded-lg">
            <FileSpreadsheet className="w-5 h-5 text-blue-400" />
            <span className="text-gray-300">.csv (CSV)</span>
          </div>
          <div className="flex items-center gap-3 p-4 bg-slate-600/30 rounded-lg">
            <FileSpreadsheet className="w-5 h-5 text-purple-400" />
            <span className="text-gray-300">.ods (OpenDocument)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkUpload;
  