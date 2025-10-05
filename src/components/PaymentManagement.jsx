import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, CheckCircle, XCircle, Clock, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('payments')
      .select(`
        *,
        orders (
          id,
          profiles (full_name)
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro ao buscar pagamentos",
        description: error.message,
      });
    } else {
      setPayments(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusLabel = (status) => {
    const labels = {
      paid: 'Pago',
      pending: 'Pendente',
      failed: 'Falhou'
    };
    return labels[status] || status;
  };

  const handleRefresh = () => {
    fetchPayments();
    toast({
      title: "Lista de pagamentos atualizada!",
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl">
            <CreditCard className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Gestão de Pagamentos</h2>
        </div>
        <Button
          onClick={handleRefresh}
          variant="outline"
          className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Atualizar
        </Button>
      </div>

      <p className="text-gray-400 mb-6">
        Monitore todas as transações e o status de pagamento dos pedidos.
      </p>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
        </div>
      ) : (
        <div className="grid gap-4">
          {payments.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <p>Nenhum pagamento encontrado.</p>
            </div>
          ) : (
            payments.map((payment, index) => (
              <motion.div
                key={payment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-700/50 rounded-xl p-6 border border-slate-600 hover:border-orange-500/50 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1 mb-4 sm:mb-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">Pagamento #{payment.id}</h3>
                      <div className="flex items-center gap-2 px-3 py-1 bg-slate-600/50 rounded-full">
                        {getStatusIcon(payment.status)}
                        <span className="text-sm text-gray-300">{getStatusLabel(payment.status)}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-400">
                      <span>Pedido: #{payment.order_id}</span>
                      <span>Cliente: {payment.orders?.profiles?.full_name || 'N/A'}</span>
                      <span>Valor: R$ {Number(payment.amount).toFixed(2)}</span>
                      <span>Método: {payment.payment_method}</span>
                      <span>Data: {new Date(payment.created_at).toLocaleString('pt-BR')}</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => toast({
                      title: "🚧 Este recurso ainda não está implementado!",
                      description: "Mas não se preocupe! Você pode solicitá-lo no seu próximo prompt! 🚀",
                    })}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                  >
                    Ver Detalhes
                  </Button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentManagement;