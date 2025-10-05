
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const InvoiceManagement = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const savedInvoices = localStorage.getItem('invoices');
    if (savedInvoices) {
      setInvoices(JSON.parse(savedInvoices));
    } else {
      const mockInvoices = [
        { id: 1, orderId: 1, customer: 'João Silva', amount: 299.70, date: '2025-10-01', status: 'issued' },
        { id: 2, orderId: 2, customer: 'Maria Santos', amount: 149.90, date: '2025-10-02', status: 'issued' },
      ];
      setInvoices(mockInvoices);
      localStorage.setItem('invoices', JSON.stringify(mockInvoices));
    }
  }, []);

  const handleGenerateInvoice = () => {
    toast({
      title: "🚧 Este recurso ainda não está implementado!",
      description: "Mas não se preocupe! Você pode solicitá-lo no seu próximo prompt! 🚀",
    });
  };

  const handleDownloadInvoice = (id) => {
    toast({
      title: "🚧 Este recurso ainda não está implementado!",
      description: "Mas não se preocupe! Você pode solicitá-lo no seu próximo prompt! 🚀",
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Geração de Notas Fiscais</h2>
        </div>
        <Button
          onClick={handleGenerateInvoice}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
        >
          <FileText className="w-4 h-4 mr-2" />
          Gerar Nova Nota
        </Button>
      </div>

      <p className="text-gray-400 mb-6">
        Automatize a emissão de notas para cada pedido.
      </p>

      <div className="grid gap-4">
        {invoices.map((invoice, index) => (
          <motion.div
            key={invoice.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-700/50 rounded-xl p-6 border border-slate-600 hover:border-orange-500/50 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Nota Fiscal #{invoice.id}</h3>
                <div className="flex gap-4 text-sm text-gray-400">
                  <span>Pedido: #{invoice.orderId}</span>
                  <span>Cliente: {invoice.customer}</span>
                  <span>Valor: R$ {invoice.amount.toFixed(2)}</span>
                  <span>Data: {new Date(invoice.date).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
              <Button
                onClick={() => handleDownloadInvoice(invoice.id)}
                variant="outline"
                className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default InvoiceManagement;
  