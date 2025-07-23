import React from 'react';
import { CARD_STYLES, VISUAL_EFFECTS } from '../../constants';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'main' | 'header' | 'content';
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  variant = 'main' 
}) => {
  const getCardStyles = () => {
    const styles = CARD_STYLES[variant];
    
    if (variant === 'main') {
      return {
        className: `${styles.borderRadius} ${styles.background} ${className}`,
        style: {
          backdropFilter: VISUAL_EFFECTS.CARD_BLUR,
          WebkitBackdropFilter: VISUAL_EFFECTS.WEBKIT_BLUR,
          boxShadow: styles.boxShadow
        }
      };
    }
    
    return {
      className: `${styles.background} ${styles.borderBottom || ''} ${className}`,
      style: {}
    };
  };

  const cardProps = getCardStyles();

  return (
    <div className={cardProps.className} style={cardProps.style}>
      {children}
    </div>
  );
};

export default GlassCard;