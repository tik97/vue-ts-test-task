import axios from "axios";
import {Component, UI} from "../app/ui";

@Component({
    // language=Vue
    template: `
        <v-container fluid class="selectable">
          <button class="show-selected_btn" @click="showSelectedEvents">Показать выбранные</button>
          <span v-if="getAmountByType.length">∑ <span v-for="amount in getAmountByType" :key="amount">{{ amount }}</span></span>
          <table>
            <tr>
              <th>Дата</th>
              <th>Сумма</th>
              <th>Количество</th>
              <th>Название</th>
              <th>Комментарий</th>
              <th>Период</th>
              <th>Действие</th>
            </tr>
            <tr v-for="(event, i) in events" :key="i" @click="redirectCurrentEvent(event)">
              <td>{{ event.date }}</td>
              <td>{{ event.totalAmount }}</td>
              <td>{{ event.quantity }}</td>
              <td>{{ event.label }}</td>
              <td>{{ event.comment }}</td>
              <td>{{ event.period }}</td>
              <td><input @click.stop type="checkbox" :value="event" v-model="checkedEvents"></td>
            </tr>
          </table>
        </v-container>
    `,
    methods: {
        // tslint:disable-next-line:typedef
        groupBy(arr: any[], property: string) {
            return arr.reduce((memo, key) => {
                if (!memo[key[property]]) { memo[key[property]] = []; }
                const amount = key.totalAmount.split(" ")[1];
                memo[key[property]].push(amount);
                return memo;
            }, {});
        },

        showSelectedEvents(event): void {
            // @ts-ignore
            this.events = this.checkedEvents;
            // @ts-ignore
            this.amountByType = this.groupBy(this.events, "type");
        },

        redirectCurrentEvent(event: object) {
            console.log(event);
            this.$router.push({
                name: "currentEventPage",
                params: event
            });
        },
    },

    computed: {
        getAmountByType() {
            const amount = [];
            for (const [key, value] of Object.entries(this.amountByType)) {
                const sum: number = value.reduce((partialSum, a) => +partialSum + +a, 0);
                amount.push(`${key}: ${sum}`);
            }
            return amount;
        }
    }
})
export class MainPage extends UI {

    private events: any = [];
    private checkedEvents: any = [];
    private amountByType: any = [];

    async created(): Promise<void> {
        this.events = (await axios.get("http://localhost:3004/events")).data;
    }
}
