
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

    alignItems: 'left',

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

const divStyle = { display: "flex" };

export class ArgumentsWidget extends ReactWidget {
    constructor() {
        super();
    }

    getValue(): string {
        return `poetry run python3 ~/hack_2022/hack2022-dapla-hurtigstart/typing-cli/hurtigstart_cli.py create \
        --projectname ${this._projectName} \
        --description ${this._projectDescription} \
        --repo-privacy "Internal" \
        ${this._pushToGithub ? "" : "--skip-github"} \
        --token ${this._usersGithubToken}`;
    }

    private _linkToDocs = 'https://github.com/statisticsnorway/stat-hurtigstart-template-master/blob/main/%7B%7Bcookiecutter.project_name%7D%7D/README.md'

    protected render(): React.ReactElement<any> {
        return (
            <div className={wrapperClass}>
                <div style={divStyle}>
                    <p>Oppretter et nytt prosjekt som følger beste praksis for programmering på Dapla. </p>
                    <a href={this._linkToDocs}> Les mer her.</a>
                </div>
                <br></br>
                <br></br>
                <label>
                    Prosjektnavn
                    <input
                        type="text"
                        id="project-name"
                        required={true}
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
                        required={true}
                        className={filterInputClass}
                        onChange={e => {
                            this._projectDescription = e.target.value;
                            this._signal.emit();
                        }}
                    />
                </label>
                <label>
                    Github
                    <input
                        type="checkbox"
                        id="project-description"
                        required={true}
                        className={filterInputClass}
                        onChange={e => {
                            this._pushToGithub = e.target.value === "true";
                            this._signal.emit();
                        }}
                    />
                </label>
                <label>
                    Github token
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
            </div >
        );
    }

    private _projectName = '';
    private _projectDescription = '';
    private _usersGithubToken = '';
    private _pushToGithub = false;
    private _signal = new Signal<this, void>(this);
}
