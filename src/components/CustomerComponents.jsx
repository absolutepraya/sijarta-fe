const Card = ({ className = '', children, ...props }) => {
    return (
      <div 
        className={`bg-white rounded-xl shadow-sm ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  };
  
  const CardContent = ({ className = '', children, ...props }) => {
    return (
      <div 
        className={`p-6 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  };
  
  // CustomButton.js
  const Button = ({ 
    className = '', 
    variant = 'default',
    size = 'default',
    children, 
    ...props 
  }) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
    
    const variants = {
      default: 'bg-blue-600 text-white hover:bg-blue-700',
      ghost: 'hover:bg-gray-100 text-gray-700',
    };
  
    const sizes = {
      default: 'h-10 px-4 py-2',
      sm: 'h-8 px-3 text-sm',
    };
  
    return (
      <button 
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };
  
  export { Card, CardContent, Button };