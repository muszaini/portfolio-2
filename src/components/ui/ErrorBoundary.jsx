import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from './Button';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.error('Portfolio render error:', error, info);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#101010] text-[#F4F0E8] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-[#191919] border border-[#C6A15B]/35 p-8 text-center">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#C6A15B] mb-3">
              Unexpected Error
            </p>
            <h1 className="font-serif text-3xl text-[#F4F0E8]">
              Something went wrong while loading this page.
            </h1>
            <p className="mt-4 text-sm text-[#A7A29A] font-light leading-relaxed">
              Please reload to restore the experience. No enquiry data was lost or exposed.
            </p>
            <div className="mt-7">
              <Button type="button" variant="primary" onClick={this.handleReload}>
                <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
                Reload Page
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
