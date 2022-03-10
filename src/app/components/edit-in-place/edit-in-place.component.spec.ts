import { fireEvent, render } from '@testing-library/angular';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { EditInPlaceComponent } from './edit-in-place.component';

const TEST_TEMPLATE = `
    <aopa-edit-in-place>
      <ng-template #aopaViewMode>
        <span data-testid="view">view</span>
      </ng-template> 

      <ng-template #aopaEditMode>
        <span data-testid="edit">edit</span>
      </ng-template>
    </aopa-edit-in-place>
    `;
const DEFAULT_DECLARATIONS = [EditInPlaceComponent];

describe('EditInPlaceComponent', () => {
  it('should display the preview template', async () => {
    await render(TEST_TEMPLATE, {
      declarations: DEFAULT_DECLARATIONS,
    });

    const view = screen.getByTestId('view');
    expect(view).toBeTruthy();
  });

  it('must change the model by clicking', async () => {
    await render(TEST_TEMPLATE, {
      declarations: DEFAULT_DECLARATIONS,
    });

    const view = screen.getByTestId('view');
    userEvent.click(view);
    const edit = screen.getByTestId('edit');
    expect(edit).toBeTruthy();
  });

  it('should display the preview template after the user click on the document', async () => {
    await render(TEST_TEMPLATE, {
      declarations: DEFAULT_DECLARATIONS,
    });

    const view = screen.getByTestId('view');
    userEvent.dblClick(view);
    fireEvent.click(document);
    expect(view).toBeTruthy();
  });
});
