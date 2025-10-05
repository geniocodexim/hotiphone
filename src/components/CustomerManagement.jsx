
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Loader2, RefreshCw, Mail, Phone, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro ao buscar clientes",
        description: error.message,
      });
    } else {
      setCustomers(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleRefresh = () => {
    fetchCustomers();
    toast({
      title: "Lista de clientes atualizada!",
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Gestão de Clientes</h2>
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
        Visualize e gerencie as informações dos seus clientes.
      </p>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
        </div>
      ) : (
        <div className="grid gap-4">
          {customers.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <p>Nenhum cliente encontrado.</p>
            </div>
          ) : (
            customers.map((customer, index) => (
              <motion.div
                key={customer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-700/50 rounded-xl p-6 border border-slate-600 hover:border-orange-500/50 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1 mb-4 sm:mb-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-3 bg-slate-600 rounded-full">
                        <UserCheck className="w-5 h-5 text-orange-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">{customer.full_name || 'Nome não informado'}</h3>
                    </div>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span>{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span>{customer.phone || 'Não informado'}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => toast({
                      title: "🚧 Este recurso ainda não está implementado!",
                      description: "Mas não se preocupe! Você pode solicitá-lo no seu próximo prompt! 🚀",
                    })}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                  >
                    Ver Perfil
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

export default CustomerManagement;
