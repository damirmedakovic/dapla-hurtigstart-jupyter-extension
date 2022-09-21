
import { ReactWidget } from '@jupyterlab/apputils';

import { Signal } from '@lumino/signaling';

import * as React from 'react';
import { style } from 'typestyle';


const wrapperClass = style({
    marginTop: '6px',
    marginBottom: '0',

    borderBottom: 'var(--jp-border-width) solid var(--jp-border-color2)'
});

const filterInputClass = style({
    boxSizing: 'border-box',

    width: '100%',
    height: '2em',

    /* top | right | bottom | left */
    padding: '1px 18px 2px 7px',

    color: 'var(--jp-ui-font-color1)',
    fontSize: 'var(--jp-ui-font-size1)',
    fontWeight: 300,

    backgroundColor: 'var(--jp-layout-color1)',

    border: 'var(--jp-border-width) solid var(--jp-border-color2)',
    borderRadius: '3px',

    $nest: {
        '&:active': {
            border: 'var(--jp-border-width) solid var(--jp-brand-color1)'
        },
        '&:focus': {
            border: 'var(--jp-border-width) solid var(--jp-brand-color1)'
        }
    }
});

export class ArgumentsWidget extends ReactWidget {
    constructor() {
        super();
    }

    getValue(): string {
        return `--project-name ${this._projectName} --project-description ${this._projectDescription} --users-full-name ${this._usersFullName}
        --users-email-address ${this._usersEmailAddress} --users-github-token ${this._usersGithubToken}`;
    }

    protected render(): React.ReactElement<any> {
        return (
            <div className={wrapperClass}>
                <label>
                    Prosjektnavn
                    <input
                        type="text"
                        id="project-name"
                        className={filterInputClass}
                        onChange={e => {
                            this._projectName = e.target.value;
                            this._signal.emit();
                        }}
                    />
                </label>
                <label>
                    Prosjektbeskrivelse
                    <input
                        type="text"
                        id="project-description"
                        className={filterInputClass}
                        onChange={e => {
                            this._projectDescription = e.target.value;
                            this._signal.emit();
                        }}
                    />
                </label>
                <label>
                    Navnet ditt
                    <input
                        type="text"
                        id="users-full-name"
                        className={filterInputClass}
                        onChange={e => {
                            this._usersFullName = e.target.value;
                            this._signal.emit();
                        }}
                    />
                </label>
                <label>
                    Mailaddressen din (fra Github)
                    <input
                        type="text"
                        id="users-email-address"
                        className={filterInputClass}
                        onChange={e => {
                            this._usersEmailAddress = e.target.value;
                            this._signal.emit();
                        }}
                    />
                </label>
                <label>
                    Din Github token
                    <input
                        type="text"
                        id="users-github-token"
                        className={filterInputClass}
                        onChange={e => {
                            this._usersGithubToken = e.target.value;
                            this._signal.emit();
                        }}
                    />
                </label>
            </div>
        );
    }

    private _projectName = '';
    private _usersFullName = '';
    private _usersEmailAddress = '';
    private _projectDescription = '';
    private _usersGithubToken = ''
    private _signal = new Signal<this, void>(this);
}
