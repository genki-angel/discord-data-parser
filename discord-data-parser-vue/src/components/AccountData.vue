<!--
 Copyright (C) 2022 genki_angel
 
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as
 published by the Free Software Foundation, either version 3 of the
 License, or (at your option) any later version.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.
 
 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
-->

<template>
    <div class="datapanels">
        <div class="backpanel">
            <div class="label">Profile data</div>
            <div class="grid">
                <div class="unselectable">User ID:&nbsp;</div>
                <div>{{ dataStore.accountID }}</div>
                <div class="unselectable">Username:&nbsp;</div>
                <div>{{ dataStore.accountName }}#{{ dataStore.accountDescriminator}}</div>
                <div class="unselectable">Email:&nbsp;</div>
                <div>{{ dataStore.accountEmail }}</div>
                <div class="unselectable">Is verified:&nbsp;</div>
                <div>{{ dataStore.accountIsVerified }}</div>
                <div class="unselectable">Mobile Number:&nbsp;</div>
                <div>{{ dataStore.accountPhoneNo }}</div>
            </div>
        </div>
    </div> 
</template>

<script setup lang="ts">
import { dataStore } from '@/store/dataStore';

</script>

<style scoped lang="scss">
@import "../scss/variables";
    .grid {
        display: grid;
        grid-template-columns: 1fr 2fr;
        color: $fg-dark;
    }
    .grid div:nth-child(odd) {
        text-align: right;
        opacity: 0.6;
        padding-right: 1em;
    }
    .datapanels {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
    .backpanel {
        margin: 4px;
    }
    .label {
        font-size: 1.3em;
    }
</style>