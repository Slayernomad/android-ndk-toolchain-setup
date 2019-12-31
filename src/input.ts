
import * as core from '@actions/core';

import stringArgv from 'string-argv';

export interface NdkToolChainSetupInput {
    api: string,
    arch: string,
    install_location: string,
    force: boolean,
}

export function get(): NdkToolChainSetupInput {
    const api = getInput('api', { required: true });
    const arch = getInput('arch', { required: true });
    let install_location = getInput('install-location');
    const force = getInputBool('force');

    return {
        api: api,
        arch: arch,
        install_location: install_location,
        force: force || false,
    }
}

// Copied from actions-rs/core
export function getInput(name: string, options?: core.InputOptions): string {
    const inputFullName = name.replace(/-/g, '_');
    const value = core.getInput(inputFullName, options);
    if (value.length > 0) {
        return value;
    }

    return core.getInput(name, options);
}

export function getInputBool(
    name: string,
    options?: core.InputOptions,
): boolean {
    const value = getInput(name, options);
    if (value && (value === 'true' || value === '1')) {
        return true;
    } else {
        return false;
    }
}