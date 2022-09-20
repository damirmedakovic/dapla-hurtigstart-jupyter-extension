import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the dapla-hurtigstart extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'dapla-hurtigstart:plugin',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension dapla-hurtigstart is activated!');
  }
};

export default plugin;
