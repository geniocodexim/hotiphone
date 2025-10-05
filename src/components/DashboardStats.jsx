import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, ShoppingCart, DollarSign, Package, Users, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';
import { toast } from '@/components/ui/use-toast';

const DashboardStats = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
    revenue: 0,
    growth: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const { data: products, error: productsError } = await supabase.from('products').select('id');
        if (productsError) throw productsError;

        const { data: orders, error: ordersError } = await supabase.from('orders').select('total_price, status, user_id');
        if (ordersError) throw ordersError;

        const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total_price), 0);
        const completedOrders = orders.filter(o => o.status === 'completed').length;
        const uniqueCustomers = new Set(orders.map(o => o.user_id)).size;

        setStats({
          totalSales: completedOrders,
          totalOrders: orders.length,
          totalProducts: products.length,
          totalCustomers: uniqueCustomers,
          revenue: totalRevenue,
          growth: 12.5 // Mocked data
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Erro ao buscar estatísticas",
          description: error.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Receita Total',
      value: `R$ ${stats.revenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-500/20 to-green-600/20'
    },
    {
      title: 'Vendas Concluídas',
      value: stats.totalSales,
      icon: TrendingUp,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-500/20 to-blue-600/20'
    },
    {
      title: 'Total de Pedidos',
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-500/20 to-purple-600/20'
    },
    {
      title: 'Produtos Cadastrados',
      value: stats.totalProducts,
      icon: Package,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-500/20 to-orange-600/20'
    },
    {
      title: 'Clientes Únicos',
      value: stats.totalCustomers,
      icon: Users,
      color: 'from-pink-500 to-pink-600',
      bgColor: 'from-pink-500/20 to-pink-600/20'
    },
    {
      title: 'Crescimento',
      value: `+${stats.growth}%`,
      icon: BarChart3,
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'from-cyan-500/20 to-cyan-600/20'
    }
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl">
          <BarChart3 className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Dashboard Completo</h2>
      </div>

      <p className="text-gray-400 mb-6">
        Visualize vendas e acompanhe métricas de desempenho em tempo real.
      </p>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br ${stat.bgColor} border border-slate-600`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                </div>
                <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '70%' }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                    className={`h-full bg-gradient-to-r ${stat.color}`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DashboardStats;