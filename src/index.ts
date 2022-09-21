import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
  showDialog,
  Dialog,
  MainAreaWidget
} from '@jupyterlab/apputils';

import { LabIcon } from '@jupyterlab/ui-components';
import SSB_LOGO from '../style/icons/ssb-logo.svg'
import { TerminalManager } from '@jupyterlab/services';
import { Terminal } from '@jupyterlab/terminal';
import { ArgumentsWidget } from './arguments-widget';
import { ILauncher } from '@jupyterlab/launcher';

namespace CommandIDs {
  export const create = 'dapla-hurtigstart';
}

export const ssbIcon = new LabIcon({
  name: 'dapla:hurtigstart',
  svgstr: SSB_LOGO
});


/**
 * Initialization data for the Dapla Hurtigstart extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'dapla-hurtigstart:plugin',
  autoStart: true,
  optional: [ILauncher],
  activate: (app: JupyterFrontEnd, launcher: ILauncher) => {
    console.log('JupyterLab extension dapla-hurtigstart is activated!');

    const commandId = CommandIDs.create;

    app.commands.addCommand(commandId, {
      execute: () => {
        showArgumentsDialog(app);
      },
      label: 'Nytt SSB-prosjekt',
      icon: ssbIcon,
    });

    let launcherItem: ILauncher.IItemOptions = {
      command: commandId,
      category: 'Other',
    };

    if (launcher) {
      launcher.add(launcherItem);
    }
  },
};

export default extension;

/**
 * Show the dialog to obtain the relevant information from the user
 * This will then be passed to the Dapla Hurtigstart CLI
 */
export function showArgumentsDialog(
  app: JupyterFrontEnd,
) {
  const dialog = showDialog({
    title: 'Opprett nytt SSB-prosjekt',
    buttons: [
      Dialog.cancelButton({ label: 'Avbryt' }),
      Dialog.createButton({ label: 'OK' }),
    ],
    body: new ArgumentsWidget()
  });

  dialog.then(async object => {
    if (object.button.accept) {
      if (object.button.label === 'OK') {
        console.log('Creating new project');

        const manager = new TerminalManager();
        const s1 = await manager.startNew();
        const term1 = new Terminal(s1, {
          initialCommand: `${object.value}`
        });
        term1.title.closable = true;

        const widget = new MainAreaWidget({ content: term1 });
        widget.id = `jupyter-dapla-hurtigstart-${Date.now()}`;
        widget.title.label = 'Opprett nytt SSB-prosjekt';
        widget.title.closable = true;

        if (!widget.isAttached) {
          // Attach the widget to the main work area if it's not there
          app.shell.add(widget, 'main');
        }
        // Activate the widget
        app.shell.activateById(widget.id);
      } else {
        console.log(`${object.button.label}`);
      }
    } else {
      console.log('Canceled');
    }
  });

  return dialog;
}
