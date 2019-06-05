import React from 'react';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface WithObservableProps {
  observable: Observable<any>;
}

export const withObservable = (WrapperComponent: React.ComponentType<any>) =>
  class WithObservable extends React.Component {
    unmount$: Subject<void> = new Subject();

    constructor(props: WithObservableProps) {
      super(props);

      const { observable } = props;

      this.state = {};

      observable
        .pipe(takeUntil(this.unmount$))
        .subscribe((passedProps: any) => this.setState({ ...passedProps }));
    }

    render() {
      return (
        <>
          {Object.keys(this.state).length ? (
            <WrapperComponent {...this.state} />
          ) : null}
        </>
      );
    }

    componentWillUnmount(): void {
      this.unmount$.next();
      this.unmount$.complete();
    }
  };
