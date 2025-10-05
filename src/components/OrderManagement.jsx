import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Clock, CheckCircle, XCircle, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        profiles (full_name)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro ao buscar pedidos",
        description: error.message,
      });
    } else {
      setOrders(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-blue-400" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: 'Pendente',
      processing: 'Processando',
      completed: 'Concluído',
      cancelled: 'Cancelado'
    };
    return labels[status] || status;
  };

  const handleUpdateStatus = (id) => {
    toast({
      title: "🚧 Este recurso ainda não está implementado!",
      description: "Mas não se preocupe! Você pode solicitá-lo no seu próximo prompt! 🚀",
    });
  };

  const handleRefresh = () => {
    fetchOrders();
    toast({
      title: "Lista de pedidos atualizada!",
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl">
            <ShoppingCart className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Gestão de Pedidos</h2>
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
        Acompanhe e atualize o status dos pedidos dos clientes em tempo real.
      </p>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
        </div>
      ) : (
        <div className="grid gap-4">
          {orders.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <p>Nenhum pedido encontrado.</p>
            </div>
          ) : (
            orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-700/50 rounded-xl p-6 border border-slate-600 hover:border-orange-500/50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">Pedido #{order.id}</h3>
                      <div className="flex items-center gap-2 px-3 py-1 bg-slate-600/50 rounded-full">
                        {getStatusIcon(order.status)}
                        <span className="text-sm text-gray-300">{getStatusLabel(order.status)}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-400">
                      <span>Cliente: {order.profiles?.full_name || 'N/A'}</span>
                      <span>Total: R$ {Number(order.total_price).toFixed(2)}</span>
                      <span>Data: {new Date(order.created_at).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleUpdateStatus(order.id)}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                  >
                    Atualizar Status
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

export default OrderManagement;