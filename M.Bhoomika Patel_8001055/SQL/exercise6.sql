USE event_management;

SELECT
    e.title,
    COUNT(res.resource_id) AS total_resources
FROM Events e
LEFT JOIN Resources res
ON e.event_id = res.event_id
GROUP BY e.title;