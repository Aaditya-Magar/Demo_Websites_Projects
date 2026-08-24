import { Component, type ReactNode } from "react";

interface Props { children: ReactNode }
interface State { hasError: boolean }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch() {
    // Intentionally not logging error details to avoid leaking sensitive
    // user content in production consoles.
  }

  reset = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="grid min-h-screen place-items-center p-6 text-center">
          <div className="max-w-md space-y-4">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl gradient-primary glow">
              <span className="text-2xl">⚠️</span>
            </div>
            <h1 className="font-display text-2xl font-bold">Something went wrong</h1>
            <p className="text-sm text-muted-foreground">
              Your data is safe and stored locally on this device. Try refreshing the page.
            </p>
            <button
              onClick={this.reset}
              className="rounded-2xl gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground glow"
            >
              Reload app
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
