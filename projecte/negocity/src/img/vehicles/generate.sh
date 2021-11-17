#!/bin/bash
	echo '<odoo><data>'

while IFS=',' read -r img name oil_consumption gas_tank speed passengers damage resistence
do
  id=$(echo $img | tr -d './')
  img=$(base64 small/$img)
  
	echo '<record id="negocity.vehicle_template_'$id'" model="negocity.vehicle_template">'
	echo '<field name="name">'$name'</field>'
	echo '<field name="image">'"$img"'</field>'
	echo '<field name="oil_consumption">'$oil_consumption'</field>'
	echo '<field name="gas_tank">'$gas_tank'</field>'
	echo '<field name="speed">'$speed'</field>'
	echo '<field name="passengers">'$passengers'</field>'
	echo '<field name="damage">'$damage'</field>'
	echo '<field name="resistence">'$resistence'</field>'

	echo '</record>'
done < cotxes.csv
	echo '</data></odoo>'
