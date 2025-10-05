
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Package, Users, FileText, BarChart3, Upload, ShoppingCart, CreditCard, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import ProductManagement from '@/components/ProductManagement';
import OrderManagement from '@/components/OrderManagement';
import ImageManagement from '@/components/ImageManagement';
import InvoiceManagement from '@/components/InvoiceManagement';
import DashboardStats from '@/components/DashboardStats';
import BulkUpload from '@/components/BulkUpload';
import PaymentManagement from '@/components/PaymentManagement';
import CustomerManagement from '@/components/CustomerManagement';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast({ title: "Logout realizado com sucesso!" });
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard Completo', icon: BarChart3 },
    { id: 'products', label: 'Gestão de Produtos', icon: Package },
    { id: 'orders', label: 'Gestão de Pedidos', icon: ShoppingCart },
    { id: 'payments', label: 'Gestão de Pagamentos', icon: CreditCard },
    { id: 'customers', label: 'Gestão de Clientes', icon: Users },
    { id: 'images', label: 'Gerenciamento de Imagens', icon: Upload },
    { id: 'invoices', label: 'Geração de Notas Fiscais', icon: FileText },
    { id: 'bulk', label: 'Upload em Massa', icon: Users },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardStats />;
      case 'products':
        return <ProductManagement />;
      case 'orders':
        return <OrderManagement />;
      case 'payments':
        return <PaymentManagement />;
      case 'customers':
        return <CustomerManagement />;
      case 'images':
        return <ImageManagement />;
      case 'invoices':
        return <InvoiceManagement />;
      case 'bulk':
        return <BulkUpload />;
      default:
        return <DashboardStats />;
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <div className="text-left">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl mb-4 shadow-2xl"
            >
              <Database className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-2">
              Painel Administrativo
            </h1>
            <p className="text-gray-300 text-lg">
              Gerencie sua loja de forma completa e integrada.
            </p>
          </div>
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="bg-transparent border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-300"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setActiveTab(item.id)}
                className={`relative overflow-hidden rounded-2xl p-4 cursor-pointer transition-all duration-300 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-br from-orange-500/20 to-orange-600/20 border-2 border-orange-500 shadow-2xl shadow-orange-500/20'
                    : 'bg-slate-800/50 border-2 border-slate-700 hover:border-orange-500/50 hover:shadow-xl'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${
                    activeTab === item.id
                      ? 'bg-gradient-to-br from-orange-500 to-orange-600'
                      : 'bg-slate-700'
                  }`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-md font-semibold text-white">{item.label}</h3>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border-2 border-slate-700 p-6 md:p-8"
        >
          {renderContent()}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
