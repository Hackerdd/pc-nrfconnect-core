/* Copyright (c) 2015 - 2017, Nordic Semiconductor ASA
 *
 * All rights reserved.
 *
 * Use in source and binary forms, redistribution in binary form only, with
 * or without modification, are permitted provided that the following conditions
 * are met:
 *
 * 1. Redistributions in binary form, except as embedded into a Nordic
 *    Semiconductor ASA integrated circuit in a product or a software update for
 *    such product, must reproduce the above copyright notice, this list of
 *    conditions and the following disclaimer in the documentation and/or other
 *    materials provided with the distribution.
 *
 * 2. Neither the name of Nordic Semiconductor ASA nor the names of its
 *    contributors may be used to endorse or promote products derived from this
 *    software without specific prior written permission.
 *
 * 3. This software, with or without modification, must only be used with a Nordic
 *    Semiconductor ASA integrated circuit.
 *
 * 4. Any software provided in binary form under this license must not be reverse
 *    engineered, decompiled, modified and/or disassembled.
 *
 * THIS SOFTWARE IS PROVIDED BY NORDIC SEMICONDUCTOR ASA "AS IS" AND ANY EXPRESS OR
 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY, NONINFRINGEMENT, AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL NORDIC SEMICONDUCTOR ASA OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
 * TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import React from 'react';
import { List } from 'immutable';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import AppListView from '../AppListView';
import { getImmutableInstalledApp } from '../../models';

describe('AppListView', () => {
    it('should render without any apps', () => {
        expect(renderer.create(
            <AppListView
                apps={List()}
                onAppSelected={() => {}}
                onMount={() => {}}
            />,
        )).toMatchSnapshot();
    });

    it('should render with two local apps', () => {
        expect(renderer.create(
            <AppListView
                apps={List([
                    getImmutableInstalledApp({
                        name: 'pc-nrfconnect-foo',
                        version: '1.2.3',
                        path: '/path/to/pc-nrfconnect-foo',
                        isOfficial: true,
                    }),
                    getImmutableInstalledApp({
                        name: 'pc-nrfconnect-bar',
                        version: '4.5.6',
                        path: '/path/to/pc-nrfconnect-bar',
                        isOfficial: false,
                    })])
                }
                onAppSelected={() => {}}
                onMount={() => {}}
            />,
        )).toMatchSnapshot();
    });

    it('should invoke onAppSelected with local app item when app is clicked', () => {
        const app = getImmutableInstalledApp({
            name: 'pc-nrfconnect-foobar',
            version: '1.2.3',
            path: '/path/to/pc-nrfconnect-foobar',
            isOfficial: false,
        });
        const onAppSelected = jest.fn();
        const wrapper = mount(
            <AppListView
                apps={List([app])}
                onAppSelected={onAppSelected}
                onMount={() => {}}
            />,
        );
        wrapper.find('AppLoadButton').first().simulate('click');

        expect(onAppSelected).toHaveBeenCalledWith(app);
    });
});
