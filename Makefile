.PHONY: dev
dev:
	npm run dev -- --open

src/lib/assets/cards_db.json:
	pants run tools/gen-cardsdb.py | jq . > $@

CARD_IMAGE_ROOT_URL = https://calebgannon.com/wp-content/uploads/cardsearch-images

.PHONY: images
images: src/lib/assets/cards_db.json
	for img in `jq -r '.cards[]|.image_name' $<`; do curl "$(CARD_IMAGE_ROOT_URL)/$$img" -o static/card_images/$$img; done

.PHONY: check-images
check-images: src/lib/assets/cards_db.json
	for img in `jq -r '.cards[]|.image_name' $<`; do [ -e static/card_images/$$img ] || echo $$img; done
