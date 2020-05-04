import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Message, Grid } from 'semantic-ui-react'

import { alertService, AlertType } from '../../services/alert.service';

const propTypes = {
    id: PropTypes.string,
    fade: PropTypes.bool
};

const defaultProps = {
    id: 'default-alert',
    fade: true
};

function Alert({ id, fade }) {
    const history = useHistory();
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        // subscribe to new alert notifications
        const subscription = alertService.onAlert(id)
            .subscribe(alert => {
                // clear alerts when an empty alert is received
                if (!alert.message) {
                    setAlerts(alerts => {
                        // filter out alerts without 'keepAfterRouteChange' flag
                        const filteredAlerts = alerts.filter(x => x.keepAfterRouteChange);

                        // remove 'keepAfterRouteChange' flag on the rest
                        filteredAlerts.forEach(x => delete x.keepAfterRouteChange);
                        return filteredAlerts;
                    });
                } else {
                    // add alert to array
                    setAlerts(alerts => ([...alerts, alert]));

                    // auto close alert if required
                    if (alert.autoClose) {
                        setTimeout(() => removeAlert(alert), 3000);
                    }
                }
            });

        // clear alerts on location change
        const historyUnlisten = history.listen(() => {
            alertService.clear(id);
        });

        // clean up function that runs when the component unmounts
        return () => {
            // unsubscribe & unlisten to avoid memory leaks
            subscription.unsubscribe();
            historyUnlisten();
        };
    }, []);

    function removeAlert(alert) {
        if (fade) {
            // fade out alert
            const alertWithFade = { ...alert, fade: true };
            setAlerts(alerts => alerts.map(x => x === alert ? alertWithFade : x));

            // remove alert after faded out
            setTimeout(() => {
                setAlerts(alerts => alerts.filter(x => x !== alertWithFade));
            }, 250);
        } else {
            // remove alert
            setAlerts(alerts => alerts.filter(x => x !== alert));
        }
    }

    function messageType(alert) {

        if (!alert) return;

        const alertTypeClass = {

            [AlertType.Success]: { postive: true },
            [AlertType.Error]: { negative: true },
            [AlertType.Info]: { info: true },
            [AlertType.Warning]: { warning: true }
        }

        return alertTypeClass[alert.type]

    }

    if (!alerts.length) return null;

    return (
        <Grid>

            {alerts.map((alert, index) =>

                <Grid.Row columns="1" key={index}>
                    <Grid.Column>

                        <Message floating
                            {...messageType(alert)}
                            header={alert.message.title}
                            content={alert.message.content}
                        />

                    </Grid.Column></Grid.Row>

            )}
        </Grid>
    );
}

Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;

export { Alert };