import { Injectable } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { SpinnerOverlayComponent} from '../spinner-overlay/spinner-overlay.component';
import {defer, NEVER} from 'rxjs';
import {finalize, share} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpinnerOverlayService {

  constructor(private overlay: Overlay) { }
  private overlayRef: OverlayRef = undefined;

  public readonly spinner$ = defer(() => {
    this.show();
    return NEVER.pipe(
      finalize(() => {
        this.hide();
      })
    );
  }).pipe(share());

  private show(): void {
    // Hack avoiding `ExpressionChangedAfterItHasBeenCheckedError` error
    Promise.resolve(null).then(() => {
      if (!this.overlayRef) {
        this.overlayRef = this.overlay.create({
          positionStrategy: this.overlay
            .position()
            .global()
            .centerHorizontally()
            .centerVertically(),
          hasBackdrop: true,
        });
        this.overlayRef.attach(new ComponentPortal(SpinnerOverlayComponent));
      }
    });
  }

  private hide(): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef = undefined;
    }
  }

}
