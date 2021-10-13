#!/bin/bash
	echo '<odoo><data>'

for i in ./small/*
do

  img=$(base64 $i)
  name=$(echo $i | tr -d './')

	echo '<record id="negocity.character_template_'$name'" model="negocity.character_template">'
	echo '<field name="name">'$name'</field>'
	echo '<field name="image">'"$img"'</field>'
	echo '</record>'
done
	echo '</data></odoo>'
