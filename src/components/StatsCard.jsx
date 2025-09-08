import React from 'react';
import { Users, MessageSquare, Award, TrendingUp } from 'lucide-react';

const StatsCard = () => {
  const stats = [
    { icon: Users, label: 'Users Helped', value: '15K+', trend: '+12%' },
    { icon: MessageSquare, label: 'Legal Queries', value: '45K+', trend: '+23%' },
    { icon: Award, label: 'Success Rate', value: '94%', trend: '+5%' },
    { icon: TrendingUp, label: 'Satisfaction', value: '4.8/5', trend: '+0.2' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl mx-auto">
      {stats.map((stat, index) => (
        <div key={index} className="glass-card p-4 rounded-lg text-white text-center">
          <stat.icon className="w-6 h-6 text-accent mx-auto mb-2" />
          <div className="text-2xl font-bold">{stat.value}</div>
          <div className="text-sm opacity-80">{stat.label}</div>
          <div className="text-xs text-accent mt-1">{stat.trend}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsCard;