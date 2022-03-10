import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { fromEvent, Subject } from 'rxjs';
import { filter, switchMapTo, take } from 'rxjs/operators';

export interface OutsideElements {
  [key: string]: ($element: HTMLElement) => boolean;
}

@Component({
  selector: 'aopa-edit-in-place',
  template: ` <ng-container *ngTemplateOutlet="currentView"></ng-container> `,
  styleUrls: ['./edit-in-place.component.scss'],
})
@UntilDestroy()
export class EditInPlaceComponent implements OnInit {
  @Output() update = new EventEmitter();
  @Input() ignoreElements: Array<string>;
  @Input() outsideElements: OutsideElements;
  @ContentChild('aopaViewMode') viewModeTemplateRef: TemplateRef<any>;
  @ContentChild('aopaEditMode') editModeTemplateRef: TemplateRef<any>;

  editMode = new Subject();
  editMode$ = this.editMode.asObservable();
  mode: 'view' | 'edit' = 'view';

  constructor(private host: ElementRef) {}

  ngOnInit() {
    this.viewModeHandler();
    this.editModeHandler();
  }

  get currentView() {
    return this.mode === 'view'
      ? this.viewModeTemplateRef
      : this.editModeTemplateRef;
  }

  private viewModeHandler() {
    fromEvent(this.$element, 'click')
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.mode = 'edit';
        this.update.next('edit');
        this.editMode.next(true);
      });
  }

  private editModeHandler() {
    const clickOutside$ = fromEvent(document, 'click').pipe(
      filter(({ target }) => {
        const $target = target as HTMLElement;
        const outside = Object.keys(this.outsideElements).some((key: string) =>
          this.outsideElements[key]($target)
        );
        return outside
          ? outside
          : !this.ignoreElements.includes($target.tagName);
      }),
      take(1)
    );

    this.editMode$
      .pipe(switchMapTo(clickOutside$), untilDestroyed(this))
      .subscribe(() => {
        this.update.next('view');
        this.mode = 'view';
      });
  }

  private get $element() {
    return this.host.nativeElement;
  }
}
